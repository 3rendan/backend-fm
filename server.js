require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const regRoutes = require('./routes/registrations')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(res.path, res.method)
    next()
})

app.use('/api/registrations', regRoutes)

app.get(('/'), (req, res) => {
    res.json({mssg: 'Welcome to the FM registration.'})
})

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

