import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { Complaint } from "./complaint";
import { User } from "./user";

export interface UnitI {
    id?: number,
    unit: "Exam"| "Registration"| "Project",
    student_id?: number
}


export class Unit extends Model<UnitI> implements UnitI {
    id?: number;
    unit!:"Exam"| "Registration"| "Project";
    student_id: number
}

Unit.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    unit: {
        type: DataTypes.ENUM("Exam", "Registration", "Project"),
        allowNull: false
    }
     
}, {sequelize, modelName: "unit"})

Unit.belongsTo(User, {foreignKey: "user_id"})