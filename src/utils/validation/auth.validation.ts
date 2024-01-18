import { ObjectSchema } from "joi";
import { UserI } from "../../models/user";
import * as Joi from "joi";
import validator from '../validator'


export const AuthValidation = async (body: UserI): Promise<UserI> => {
     const schema : ObjectSchema = Joi.object({
          email: Joi.string().email().required(),
          fullname: Joi.string().required(),
          admissionNumber: Joi.string().required(),
          password: Joi.string().min(8).max(10000)
     })

     return validator(schema, body)
}