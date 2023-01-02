require('dotenv').config()
const http = require('http')
const PORT = process.env.PORT
const app = require('./app')

//database
require('./config/database')

const server = http.createServer(app)
server.listen(PORT, (error, result) => {
    console.log(`Server is listening at PORT:${PORT}`);
})