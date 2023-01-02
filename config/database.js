const mysql = require('mysql2')

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } = process.env
const con = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
})

con.connect((err, result) => {
    if (err)
        throw err
    console.log('Database connected successfully...')
})

module.exports = con