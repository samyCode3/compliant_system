import { ObjectSchema } from "joi";
import { LoginI, UserI } from "../../models/user";
import * as Joi from "joi";
import validator from '../validator'


export const UserCreationValidation = async (body: UserI): Promise<UserI> => {
     const schema : ObjectSchema = Joi.object({
          email: Joi.string().email().required(),
          fullname: Joi.string().required(),
          admissionNumber: Joi.string().required(),
          password: Joi.string().min(8).max(10000).required()
     })

     return validator(schema, body)
}
export const LoginValidation = async (body: LoginI): Promise<LoginI> => {
     const schema : ObjectSchema = Joi.object({
          identifier: Joi.string().required(),
          password: Joi.string().required()
     })

     return validator(schema, body)
}