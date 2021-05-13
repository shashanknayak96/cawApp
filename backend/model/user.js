const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userTag: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        messages: [{ type: ObjectId, ref: 'cawMessage' }],
        followers: [{ type: ObjectId }],
        following: [{ type: ObjectId}],
        likesMessages: [{ type: ObjectId}],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('user', userSchema);