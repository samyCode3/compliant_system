import { StatusCodes } from 'http-status-codes'
import * as Db from '../models/index.init'
import { BadRequestError, messageType } from '../middleware/error'
import { FindOptions, Op } from 'sequelize';
import { Decrypt } from '../utils/security';


type Db = any
export default class resourceService {
     async create(payload: any, model: Db){
          const resource = await model.create({...payload})
          return resource
          
     }
      async findOne(payload : any, model: Db, type?:any){
          let resources
          let message
          let where = {
            payload
          }
           message = `Unable to get user with this ${Object.keys(where.payload).join(', ')}: ${Object.values(where.payload).join(', ')}`
           resources = await model.findOne({where: payload})
          if(!resources) {
            throw BadRequestError(message);
          }
          resources = resources.dataValues
          delete resources.password
          return resources
     }

    async LoginUserCredetails (payload : any, model: Db, type?:any) {
        let user
        user = await model.findOne({where: payload})
        let message = `Invaild login or password`
        if(!user) {
            throw BadRequestError(message);
        }
        
      return user
     }

      async comparePasswords(password: string, hashedPassword: string): Promise<boolean>{
        let compare = Decrypt(password, hashedPassword);
         return compare
      }
   
     
}