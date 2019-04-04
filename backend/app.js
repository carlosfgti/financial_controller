const app = require('express')()
const consign = require('consign')

consign()
    .include('./middlewares')
    .then('./controllers')
    .then('./models')
    .then('./routes')
    .into(app)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen port ${port}`))