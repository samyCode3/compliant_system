import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
// import { IndexRoutes } from './routes'
import { sequelize } from './config/database.config'
import { StatusCodes } from 'http-status-codes'
import * as useragent from 'useragent'
import rateLimit from 'express-rate-limit'
import * as apicache from 'apicache'
import './models/index.init'
import { log } from './utils/logger'
import { client } from './config/redis'
import indexRoutes from './routes'
dotenv.config()

const PORT = process.env.PORT


const app =  express()
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50
})
app.use(limiter)
app.set('trust proxy', 1)
app.use(express.json({ limit : "50mb"}))
app.use(cors())
let cache = apicache.middleware
app.use(cache('5 seconds'))
app.use('/api/v1', indexRoutes)
app.get('/', (req, res) => {
    const userAgentString = req.headers['user-agent'];

    // Parse the user agent string
    const agent = useragent.parse(userAgentString);
    const browser = agent.toAgent();
    const os = agent.os.toString();
    const device = agent.device.toString();
  
    // Log the information (you can do anything you want with this information)
    log('info', `Ip: ${ req.headers['x-forwarded-for'] || req.connection.remoteAddress},Method: ${req.method}, Info:  ${req.protocol}://${req.hostname}${req.path}, Browser: ${browser}, Operating System: ${os}, Device: ${device}`)
   return res.json({ 
    message: "Welcome"
})
})
// app.use('/api/v1', IndexRoutes)

 
app.all('*', (req, res) => {
    const userAgentString = req.headers['user-agent'];

    // Parse the user agent string 
    const agent = useragent.parse(userAgentString); 
    const browser = agent.toAgent();
    const os = agent.os.toString();
    const device = agent.device.toString();
  
    // Log the information (you can do anything you want with this information)

    log('error', `Ip: ${ req.headers['x-forwarded-for'] || req.connection.remoteAddress}, Method: ${req.method}, Url: ${req.url}, Info:  ${req.protocol}://${req.hostname}${req.path}, Routes Not Found ---> Browser: ${browser}, Operating System: ${os}, Device: ${device}  `)
     return res.status(StatusCodes.NOT_FOUND).json({ ok: false, status: StatusCodes.NOT_FOUND, message: `Route Not Found`,ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, method: req.method, url: req.url,
     info: {
        url: `${req.protocol}://${req.hostname}${req.path}`,
      }, 
     userAgent: 
     {browser, os, device}})
})
sequelize.sync({alter: true}) 
.then( async () => {
    console.log(`Database connection is established`)
    await client.connect()
    .then((done) => {
        console.log("Redis is connected")
        setTimeout(() => {
            console.log(`Queue is establish`)
        }, 4000)
    })
   .catch(err => log(`error`, err))
    app.listen(PORT, () => {
        console.log(`App running on port http://localhost:${PORT}`)
    })  
}) .catch( err => { console.log(err)})



