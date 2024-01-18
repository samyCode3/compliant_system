import { NextFunction } from "express"

import { VerifyToken } from "../utils/security"
import { ForbiddenError, UnauthorizedError } from "./error"
import resource from "../resource/resource"
import { User } from "../models/user"
import { log } from "../utils/logger"
import { Role } from "../models/role"
import { ROLE_E } from "../types/enum"

const secret = process.env.JWT_SECRET


export const  deserializeUser = async (
    req: Request | any,
    res:  Response |  any,
    next : NextFunction
     ) => 
     {
        try {
            let authHeader = req.headers['authorization']
            if(!authHeader) {
               const err = UnauthorizedError("Auth token not valid")
               return res.status(err.status).json(UnauthorizedError(err.message))
              
            }

            const token = authHeader.split(" ")[1]

            if(!token) {
                const err = UnauthorizedError("Unauthorized request")
                return res.status(err.status).json(UnauthorizedError(err.message))
            }

            let user: any = VerifyToken(token, secret)
            user = await resource.findOne(Number(user?.id), User)
            req.user = user
            
            next()
        } catch (error) {
               const err = ForbiddenError("Forbidden")
               return res.status(err.status).json(ForbiddenError(err.message))
        }
      
     }




export const  AUTH_USER = async (
    req: Request | any,
    res:  Response |  any,
    next : NextFunction
     ) => 
     {
        try {
            let authHeader = req.headers['authorization']
            if(!authHeader) {
               const err = UnauthorizedError("Auth token not valid")
               return res.status(err.status).json(UnauthorizedError(err.message))
              
            }

            const token = authHeader.split(" ")[1]

            if(!token) {
                const err = UnauthorizedError("Unauthorized request")
                return res.status(err.status).json(UnauthorizedError(err.message))
            }

            let user: any = VerifyToken(token, secret)
          
            user = await resource.findOne(Number(user?.id), Role)
            // console.log(user.role)
            // if(user.role !== ROLE_E.individual || user.ROLE_E !== ROLE_E.Practitioner) {
            //     const err = UnauthorizedError("Please create a role")
            //     return res.status(err.status).json(UnauthorizedError(err.message))
            // }
            req.user = user
            
            next()
        } catch (error) {
               const err = ForbiddenError("Forbidden")
               return res.status(err.status).json(ForbiddenError(err.message))
        }
      
     }
