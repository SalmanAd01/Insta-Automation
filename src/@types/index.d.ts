import {Request,Response,NextFunction} from "express"
import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}
