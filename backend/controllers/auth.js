

module.exports = app => {
    const User = app.models.user

    const signup = (req, res, next) => {
        const user = new User(req.body)

        console.log(user)        
    }
}