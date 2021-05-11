const CawMessage = require('../model/cawMessage');
const User = require('../model/user');

exports.addCaw = (req, res, next) => {
    const { cawMessage, userId, timestamp } = req.body;
    const message = new CawMessage({
        cawMessage,
        userId,
        timestamp,
        totalLikes: 0
    })

    message.save()
        .then(cawMessage => {
            res.status(201).json({
                message: "caw_added_successfully",
                res: cawMessage._id
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "unexpected_error",
                error: error
            })
        }
        )
}

exports.getCaws = (req, res, next) => {
    const { userId } = req.body;
    CawMessage.find({ userId: userId })
        .sort({ 'timestamp': "desc" })
        .populate('userId')
        .then(messages => {
            res.status(201).json({
                message: messages
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "unexpected_error",
                error: error
            })
        })

}

exports.getCawById = (req, res, next) => {
    const {messageId} = req.query;
    console.log(messageId);
    CawMessage.findById(messageId)
        .populate('userId')
        .then(message  => {
            res.status(201).json({
                message: 'sent_message_by_id',
                message: message
            })
        })
        .catch(error => {
            res.status(500).json({
                error
            })
        })
}

exports.likeCaw = (req, res, next) => {
    const { userId, messageId } = req.body;

    CawMessage.findByIdAndUpdate(messageId, { $inc: { totalLikes: 1 } })
        .then( (r) => {
            if(r){
                return User.findOneAndUpdate({userId}, {$push: {likesMessages: messageId}})         
            }}
        )
        .then((r) => {
            res.status(201).json({
                message: 'caw_liked',
                liked_message: messageId,
                userId: userId
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "unexpected_error",
                error: error
            })
        })
}

exports.unlikeCaw = (req, res, next) => {
    const { userId, messageId } = req.body;

    CawMessage.findByIdAndUpdate(messageId, { $inc: { totalLikes: -1 } })
        .then( (r) => {
            if(r){
                return User.findOneAndUpdate({userId}, {$pull: {likesMessages: messageId}})         
            }}
        )
        .then((r) => {
            res.status(201).json({
                message: 'caw_unliked',
                liked_message: messageId,
                userId: userId
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "unexpected_error",
                error: error
            })
        })
}