import { BadRequestError, CreationMessage } from "../middleware/error"
import { Complaint, ComplaintI } from "../models/complaint"
import { Unit, User } from "../models/index.init"
import resourceService from "../resource/resource"



export default class UnitService {
    private resource = new resourceService()
    async createUnitToCompliant(unit: string){
        let newUnit
        newUnit = await  this.resource.create({unit}, Unit)
        return newUnit

     }

     async createComplaintToUnit(payload: ComplaintI,user: any) {
           let {id} = user 
           let unit = await this.createUnitToCompliant(payload.unit)
           let complaint =  await this.resource.create({...payload, unit_id: unit.id, user_id: id}, Complaint)
           return CreationMessage("Complain is send, Please check back for reponse", {unit, complaint})
     }
}
