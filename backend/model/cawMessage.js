const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cawMessageSchema = new Schema(
    {
        cawMessage: { type: String, required: true },
        timestamp: { type: Date, required: true },
        totalLikes: { type: Number, required: true },
        userId: { type: ObjectId, ref: 'user'},
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('cawMessage', cawMessageSchema);