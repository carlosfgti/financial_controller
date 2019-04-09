const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')

consign()
    .include('./middlewares/middleware.js')
    .then('./models')
    .include('./middlewares/passport.js')
    .then('./controllers')
    .then('./routes')
    .into(app)

mongoose.connect('mongodb://localhost:27017/financial_controller', {useNewUrlParser: true })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen port ${port}`))