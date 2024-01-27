import Bull = require("bull");
import { client
 } from "../config/redis";




 export default class QueuingWorker {
        async NotificationQueue(message: any) {
          const notification = await client.setEx('notification', 3000, JSON.stringify(message))
          return notification
        }
    }