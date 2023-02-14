const express = require('express')
require('./db/mongoose')
const inventoryRouter = require('./router/route.js')
const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(inventoryRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})