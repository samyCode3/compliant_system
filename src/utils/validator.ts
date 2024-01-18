import { ObjectSchema } from "joi";
import { StatusCodes } from "http-status-codes";

export default (schema : ObjectSchema, body : any) =>{
    const { error, value } = schema.validate(body,{stripUnknown:true, abortEarly: true});
    console.log({error})
    if(error){
        throw { ok : false, message : error.details[0].message, status : StatusCodes.BAD_REQUEST };
    }

    return value;
}