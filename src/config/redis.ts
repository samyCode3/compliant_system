import { createClient } from "redis";


export const client = createClient({
    url: process.env.REDIS_URL
})

client.on('error', (err : any) =>  console.log('Redis error' + err))
