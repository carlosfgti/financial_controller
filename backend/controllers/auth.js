

// const User = require('../models/user')

module.exports = app => {
    const User = app.models.user

    const signup = (req, res, next) => {
        const user = new User({... req.query})
        user.save()
            .then(result => {
                return res.status(201).json({
                    message: 'User Created OK',
                    data: user,
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    message: error,
                })
            })
    }

    return { signup }
}