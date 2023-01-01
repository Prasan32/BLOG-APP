const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoutes')
const morgan = require('morgan')

// global middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', authRoutes)

app.use((req, res, next) => {
    res.status(404).json({ "message": "Page not found !!!" })
})

module.exports = app