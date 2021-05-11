const CawMessage = require('../model/cawMessage');

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
        .sort({'timestamp': "desc"})
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