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
            if (user) {
                user.id = user._id;
                user.feed = feed;
                return user;
            }
           return null;
        },
        post: async (_, args) => {
            const post = await postModel.findOne({_id: args.id}).exec();
            if (post) {
                post.id = post._id;
                return post;
            }
            return null;
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const user = await userModel.create({
                ...args,
                password: await bcrypt.hash(args.password, await bcrypt.genSalt())
            });
            return {
                ...user._doc,
                id: user._doc._id,
            };
        },
        authenticateUser: async (_, args) => {
            const user = await userModel.findOne({
                email: args.email
            });

            const passwordsMatch = user ? await bcrypt.compare(args.password, user.password) : false;

            if (passwordsMatch) {
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
            }

            return null;
        },
        createPost: async (_, args) => {
            const token = await verifyToken(args.token);
            if (token.isValid) {
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
    }
};

module.exports = {
    ...userResolver
};