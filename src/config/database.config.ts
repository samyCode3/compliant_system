import {Sequelize} from 'sequelize'
import * as mysql2 from 'mysql2'
import * as EnvConfig from 'dotenv'
EnvConfig.config()

const HOST = process.env.DB_HOST
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASS
const DATABASE = process.env.DB_DATABASE
const PORT = process.env.DB_PORT 


export const sequelize = new Sequelize({
   dialect: 'mysql',
   dialectModule: mysql2,
   host: HOST,
   username : USER,
   password : PASSWORD,
   database: DATABASE,
   port: Number(PORT)
})

console.log(
    `DB_HOST = ${HOST} \n`,
    `DB_USER = ${USER} \n`,
    `DB_DATABASE = ${DATABASE} \n`,
    `DB_PORT = ${PORT} \n`,

)