import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { Encrypt_Data } from "../utils/security";
import { User } from "./user";
import { Unit } from "./unit";

export interface ComplaintI {
    id?: number,
    unit?: string,
    complaint: string,
    description: string
    status: "Pending" |  "Resolved"
}


export class Complaint extends Model<ComplaintI> implements ComplaintI {
    id?: number;
    complaint!: string;

    description!: string;
    status!: "Pending" |  "Resolved"
}

Complaint.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    complaint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Resolved"),
        defaultValue: 'Pending',
      },
}, {sequelize, modelName: "Complaint"})

Complaint.belongsTo(Unit, {foreignKey: "unit_id"})
Complaint.belongsTo(User, {foreignKey: "user_id"})