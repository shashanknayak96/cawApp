const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cawMessage = require('../model/cawMessage');


exports.sigupUser = (req, res, next) => {
    const { userTag, firstName, lastName, email, password } = req.body;

    User.findOne({ email: email })
        .then(r => {
            if (r) {
                const error = new Error('user_already_exists');
                error.statusCode = 401;
                res.status(401).json({
                    message: "User already exists",
                    error: "user_exists"
                })
            } else {

                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        return hashedPassword;
                    })
                    .then((hashedPassword) => {
                        const user = new User({
                            userTag, firstName, lastName, email, password: hashedPassword
                        })
                        user.save()
                            .then(userDocument => {
                                res.status(201).json({
                                    message: "user_added_successfully",
                                    res: userDocument._id
                                })
                            })
                    })
                    .catch(error => {
                        throw error;
                    })
            }
        })
}

exports.loginUser = (req, res, next) => {
    console.log('LOGIN');
    email = req.body.email;
    password = req.body.password;
    let savedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('email_doesnt_exist');
                error.statusCode = 401;
                throw error;
            }
            savedUser = user;
            return user;
        })
        .then(user => {
            return bcrypt.compare(password, user.password)
        })
        .then(compareResult => {
            if (!compareResult) {
                const error = new Error('incorrect_password');
                error.statusCode = 402;
                throw error;
            }
            return jwt.sign({ email: savedUser.email, id: savedUser._id.toString() }, 'cawAppSecretKey', { expiresIn: '1hr' })
        })
        .then(token => {
            res.status(201).json({
                message: 'user_logged_in',
                token: token,
                id: savedUser._id
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "unexpected_error",
                error: error
            })
        })
}

exports.getUserById = (req, res, next) => {
    const { userId } = req.query;
    User.findById(userId)
        .then(user => {
            if (user) {
                res.status(201).json({
                    message: 'get_user_by_id',
                    user: user
                })
            }
        })
        .catch(error => {
            res.status(501).json({
                message: 'user_not_found',
                error
            })
        })
}

exports.checkUserTag = (req, res, next) => {
    const { userTag } = req.body;
    console.log(userTag);
    User.findOne({userTag: userTag})
        .then(user => {
            if (user) {
                res.status(201).json({
                    message: 'tag_already_in_use'
                })
            }else {
                res.status(201).json({
                    message: 'tag_available'
                })
            }
        })
        .catch(error => {
            res.status(501).json({
                message: 'user_not_found',
                error
            })
        })
}

exports.getUserByNameOrTag = (req, res, next) => {
    const { queryString } = req.query;

    User.find({ $or: [{ firstName: new RegExp('^' + queryString + '.*', "i") }, { userTag: new RegExp('^' + queryString + '.*', "i") }] })
        .then(users => {
            if (users) {
                res.status(201).json({
                    message: 'user_found',
                    users: users
                })
            }
        })
}

exports.followUser = (req, res, next) => {
    const { mainUser, followUser } = req.body;

    User.findByIdAndUpdate(mainUser, { $push: { following: followUser } })
        .then(r => {
            if (r) {
                return User.findByIdAndUpdate(followUser, { $push: { followers: mainUser } })
            }
        })
        .then(r => {
            res.status(201).json({
                message: 'followed_user'
            })
        })
        .catch(error => {
            res.status(501).json({
                message: 'follow_error',
                error
            })
        })
}

exports.unfollowUser = (req, res, next) => {
    const { mainUser, unfollowUser } = req.body;

    User.findByIdAndUpdate(mainUser, { $pull: { following: unfollowUser } })
        .then(r => {
            if (r) {
                return User.findByIdAndUpdate(unfollowUser, { $pull: { followers: mainUser } })
            }
        })
        .then(r => {
            res.status(201).json({
                message: 'unfollowed_user'
            })
        })
        .catch(error => {
            res.status(501).json({
                message: 'unfollow_error',
                error
            })
        })
}