module.exports = app => {
    app.route('/signup')
        .post(app.controllers.auth.signup)
}