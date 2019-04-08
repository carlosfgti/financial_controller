const bcrypt = require('bcrypt-nodejs')

// const User = require('../models/user')

module.exports = app => {
    const User = app.models.user

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)

        return bcrypt.hashSync(password, salt)
    }

    const signup = (req, res, next) => {
        let data = {... req.query}
        data.password = encryptPassword(data.password)

        const user = new User(data)
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