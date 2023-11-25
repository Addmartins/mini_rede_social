const dotenv = require('dotenv').config();

module.exports =
    require('knex')({
        client: 'pg',
        connection: {
            host: process.env.DBHOST || DBHOST,
            user: process.env.DBUSER || DBUSER,
            port: process.env.DBPORT || DBPORT,
            password: process.env.DBPASS || DBPASS,
            database: process.env.DATABASE || DATABASE
        }
    })
