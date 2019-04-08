const { mySecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const User = app.models.user

    console.log('Aqui');
    

    const params = {
        secretOrKey: mySecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        User.findOne({email: payload.email})
            .then(user => done(null, user))
            .catch(error => done(error, false))
    })

    passport.use(strategy)

    return {
        authApi: () => passport.authenticate('jwt', { session: false })
    }
}
