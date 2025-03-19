const express = require("./master/express")
const mongoose = require("./master/mongoose")
const botBackend = require('./master/botbackend')

const app = express()
mongoose()
botBackend()

app.listen(process.env.PORT, () => {
    console.log(`http server is running on ${process.env.PORT}.`)
})
