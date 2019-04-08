module.exports = app => {
    app.route('/signup')
        .post(app.controllers.auth.signup)

    app.route('/signin')
        .post(app.controllers.auth.login)
}