const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const { mySecret } = require('../.env')

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

    const login = (req, res, next) => {
        const data = {... req.query}

        User.findOne({email: data.email})
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        error: 'A user with this email could not be found.'
                    })
                }

                const isMatch = bcrypt.compareSync(data.password, user.password)
                if (!isMatch) {
                    return res.status(401).json({
                        error: 'Password incorret'
                    })
                }

                const payload = user

                res.json({
                    payload,
                    token: jwt.encode(payload, mySecret)
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    error: 'Error!!!'
                })
            })
    }

    return { signup, login }
}