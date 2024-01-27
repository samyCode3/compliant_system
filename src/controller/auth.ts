import { NextFunction } from "express";
import { LoginValidation, UserCreationValidation } from "../utils/validation/auth.validation";
import { loginService, regService } from "../services/auth.service";



export default  {
   async createUser(req: Request | any, res: Response | any, next : NextFunction) {
    let {body} = req
     try {
        let payload = await UserCreationValidation(body)
        let user = await regService(payload)
        return res.status(user?.status).json({...user})
     } catch (error) {
         next(error)
     }
       
   },

   async loginController(req: Request | any, res: Response | any, next : NextFunction) {
    let {body} = req
    try {
       let payload = await LoginValidation(body)
       let user = await loginService(payload)
       return res.status(user?.status).json({...user})
    } catch (error) {
        next(error)
    }
   }
}