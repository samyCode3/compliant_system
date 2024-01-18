import { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { log } from '../utils/logger';
import * as useragent from 'useragent'
export const ErrorHanddlerMiddleWare =  (error: any, req: Request | any, res: Response | any, next: NextFunction) => {
    const { url, ip} = req
    const userAgentString = req.headers['user-agent'];
    
    // Parse the user agent string
    const agent = useragent.parse(userAgentString);
    const browser = agent.toAgent();
    const os = agent.os.toString();
    const device = agent.device.toString();
    
     try {

        if(error.ok === false)  {
            ClientInfoLog(error.message)
            return res.status(error.status ).json({ok: false, status : error.status,error : error.message})
        } 
       
       if(error.name == "SequelizeUniqueConstraintError") {
          const err = SequelizeValidationError(`${error.errors[0].path} has already been used`)
          ClientInfoLog(err.message)
          return res.status(err.status).json(err)
       }
        if (error.name == "SequelizeValidationError") {
            const err = SequelizeValidationError(`${error.errors[0].message}`)
            ClientInfoLog(err.message)
            return res.status(err.status).json(err)
            
          } 

 
    } catch(error: any) {
        log('error', `Ip: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}, Method: ${req.method}, Url: ${req.url},  Message: ${error.message},Browser: ${browser}, Operating System: ${os}, Device: ${device}` )
        return res.status(500).json({ok: false, status : StatusCodes.INTERNAL_SERVER_ERROR, error : error.message});
    }
}


export const LogMessages = (level: any, message: any) => {
    log(level, message)
}

export const messageType = (message:string,type: string) => {
    if(type = "INVALID_CREDENTAIL") {
        BadRequestError(message)
    }
    if(type = "NOT_FOUND") {
        BadRequestError(message)
    }
}

export const BadRequestError = (message: string) => {
   
      return { ok: false, status: StatusCodes.BAD_REQUEST, message}
}
export const ForbiddenError = (message: string) => {
      return { ok: false, status: StatusCodes.FORBIDDEN, message}
}
export const UnauthorizedError = (message: object | string) => {
      
      return { ok: false, status: StatusCodes.UNAUTHORIZED, message}
}

export const SuccessMessage = (message: string, body? : any) => {
    return { ok: true, status: StatusCodes.OK, message, body}
}
export const CreationMessage = (message: string, body? : any) => {
    return { ok: true, status: StatusCodes.CREATED, message, body}
}

export const ClientInfoLog = async (err: any) => {
    return log('error', `message: ${err}`)
 }

export const SequelizeValidationError = (message:string) => {
    return { ok : false, status: StatusCodes.BAD_REQUEST, message };
}
export const SequelizeUniqueConstraintError = (message:string) => {
    return { ok : false, status: StatusCodes.BAD_REQUEST, message };
}
