import { StatusCodes } from 'http-status-codes'
import * as Db from '../models/index.init'
import { BadRequestError, messageType } from '../middleware/error'
import { FindOptions, Op } from 'sequelize';
import { Decrypt } from '../utils/security';


type Db = any

     export const create = async (payload: any, model: Db) => {
          const resource = await model.create({...payload})
          return resource
          
     }
     export const  findOne = async (payload : any, model: Db, type?:any) => {
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

   
     export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
        let compare = Decrypt(password, hashedPassword);
         return compare
      }
   
     
