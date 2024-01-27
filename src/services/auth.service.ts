import { Op } from "sequelize";
import { BadRequestError, CreationMessage, SuccessMessage } from "../middleware/error";
import { User, UserI } from "../models/user";
import {comparePasswords, create} from '../resource/resource'
import { AccessToken } from "../utils/security";


export const regService = async (payload: UserI) => {
          let user = await create({...payload}, User)
          user = user.dataValues
          delete user.password
          return CreationMessage("Student created successfully", {user})
     }

     export const  loginService = async (payload: {identifier: string, password: string} ) => {

          let user =  await  User.findOne({
        where: { [Op.or]: [{ email: payload.identifier }, {admissionNumber: payload.identifier}] },

    })
         if(!user) {
          throw BadRequestError("Invalid email, addmissionNumber, or password")
         }
          let compare = await comparePasswords(payload.password, user.password)
          if(!compare) {
            throw BadRequestError("Invalid email, addmissionNumber, or password")
          }
          let token = AccessToken(user.id)
          return SuccessMessage("Login was successfull", {token, user})
     }
