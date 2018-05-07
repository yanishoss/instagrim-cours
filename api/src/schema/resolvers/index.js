const { postModel } = require("../../models");
const { userModel } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../utils/verifyToken");

const expireIn = (expirationTimeInSecond) => new Date().getTime() + expirationTimeInSecond * 1000;
const privateKey = require("../../config").SECRET_KEY;

const userResolver = {
    Date: require("graphql-date"),
    Query: {
        user: async (_, args) => {
            const user = await userModel.findOne({
                username: args.username
            }).exec();
            const token = await verifyToken(args.token);
            let feed = null;
            if (token.isValid && token.user.username === args.username) {
                feed = await postModel.find().limit(args.last || 15).exec();
            }
            if (!user) {
                throw new Error("There is not such user.");
            }
            user.id = user._id;
            user.feed = feed;
            return user;
        },
        post: async (_, args) => {
            const post = await postModel.findOne({_id: args.id}).exec();
            if (!post) {
                throw new Error("This post doesn't exist.");
            }
            post.id = post._id;
            return post;
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const withUsername = await userModel.count({username: args.username});
            const withEmail = await userModel.count({email: args.email});
        
            if (withUsername || withEmail) {
                throw new Error("This user already exists.");
            }

            const user = await userModel.create({
                ...args,
                password: await bcrypt.hash(args.password, await bcrypt.genSalt())
            });
            return {
                ...user._doc,
                id: user._doc._id,
            };
        },
        updateUser: async (_, args) => {
            const token = await verifyToken(args.token);

            if (!token.isValid) {
                throw new Error("The token provided is invalid.")
            }

            await userModel.updateOne(token.user, args).exec();
            const user = await userModel.findById(token.user._id).exec();
            user.id = user._id;
            return user;
        },
        authenticateUser: async (_, args) => {
            const user = await userModel.findOne({
                email: args.email
            });

            const passwordsMatch = user ? await bcrypt.compare(args.password, user.password) : false;

            if (!passwordsMatch) {
                throw new Error('The credentials are incorrect.')
            }

            // 1 s * 60 * 60 = 1 hour
            const expirationTime = expireIn(60*60);
            const token = jwt.sign({
                sub: user._id,
                // Expires in 1 hour
                exp: expirationTime
            }, privateKey);
            const expirationDate = new Date();
            expirationDate.setTime(expirationTime);
            return {
                token,
                exp: expirationDate
            }
        },
        createPost: async (_, args) => {
            const token = await verifyToken(args.token);

            if (!token.isValid){
                throw new Error('The token provided is invalid.')
            }

            const post = await postModel.create({
                ...args,
                author: token.user
            });
            const user = await userModel.updateOne(token.user, {
                posts: [...token.user.posts, post]
            })
            return {
                ...post._doc,
                id: post._doc._id
            }
        }
    }
};

module.exports = {
    ...userResolver
};