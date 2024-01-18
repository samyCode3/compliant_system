import { BadRequestError, CreationMessage, SuccessMessage } from "../middleware/error";
import { User, UserI } from "../models/user";
import resourceService from "../resource/resource";
import { AccessToken } from "../utils/security";
export default class AuthService {
    private resource = new resourceService()
     async regService(payload: UserI) {
          let user = await this.resource.create({...payload}, User)
          user = user.dataValues
          delete user.password
          return CreationMessage("Student created successfully", {user})
     }

     async loginService(payload: {identifier: string, password: string} ) {
          let user =  await this.resource.findOne({email: payload.identifier, username: payload.identifier}, User)
          let compare = await this.resource.comparePasswords(payload.password, user.password)
          if(!compare) {
            throw BadRequestError("Invalid email or password")
          }
          let token = AccessToken(user.id)
          return SuccessMessage("Login was successfull", {token, user})
     }
}