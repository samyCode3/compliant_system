import { createClient } from "redis";


export const client = createClient({
    url: process.env.REDIS_URL || ""
})

client.on('error', (done) =>  {
     console.log('Running redis')
     setTimeout(() => {
         console.log(`Redis is up and running`)
         done()
     }, 4000)
})
