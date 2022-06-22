import {Request,Response} from "express"
import mongoose from "mongoose"
export type reqRes ={
    req:Request,
    res:Response
}

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}
