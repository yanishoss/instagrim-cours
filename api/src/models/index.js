const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(null, {
    _id: true
});
const userSchema = new mongoose.Schema(null, {
    _id: true
});

postSchema.add({
    image: {
        type: String,
        required: true
    },
    description: String,
    author: {
        type: userSchema,
        required: true,
        unique: false
    }
});

userSchema.add({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [postSchema]
});

exports.postModel = mongoose.model("Post", postSchema);
exports.userModel = mongoose.model("User", userSchema);