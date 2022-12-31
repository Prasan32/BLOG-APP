require('dotenv').config()
const http = require('http')
const port = process.env.PORT


const server = http.createServer()
server.listen(port, (error, result) => {
    console.log(`Server is listening at PORT:${port}`);
})