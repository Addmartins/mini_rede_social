const dotenv = require('dotenv').config();

module.exports =
    require('knex')({
        client: 'pg',
        connection: {
            host: process.env.HOST || HOST,
            user: process.env.USER || USER,
            port: process.env.PORT || PORT,
            password: process.env.PASS || PASS,
            database: process.env.DATABASE || DATABASE
        }
    })
