import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { Encrypt_Data } from "../utils/security";

export interface UserI {
    id?: number,
    fullname: string,
    admissionNumber: string,
    email: string,
    password: string
    role : "exam office"| "registration office"| "project coordinator"| "student"
}

export interface LoginI {
    identifier: string,
    password: string
}

export class User extends Model<UserI> implements UserI {
    id?: number;
    email!: string;
    admissionNumber!: string;
    role!: "exam office"| "registration office"| "project coordinator"| "student"
    fullname!: string;
    password!: string;

}

User.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admissionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "admission_unique"
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique:"email_unique"
    },
    role : {
         type: DataTypes.ENUM("exam office", "registration office", "project coordinator", "student"),
         allowNull: false,
         defaultValue: 'student'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val: string) {
            this.setDataValue('password', Encrypt_Data(val))
        }
    }
}, {sequelize, modelName: "user"})