const Sequelize = require('sequelize')
const { DATABASE_USER, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_NAME } = process.env
const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: 'mysql'
    }
)

global.sequelize = sequelize
module.exports = sequelize