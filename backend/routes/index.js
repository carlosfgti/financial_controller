module.exports = app => {
    app.route('/')
        .all(app.middlewares.passport.authApi())
        .get((req, res) => {
            res.send('Welcome')
        })
}