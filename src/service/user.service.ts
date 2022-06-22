import User from "../models/user.model";
import { DocumentDefinition } from "mongoose";
import { UserDocument } from "../@types";
import { MongoError } from "mongodb";

export const createUser =async (user:DocumentDefinition<UserDocument>) =>{
    try{
        return await User.create(user);
    }
    catch(error){
        if((error as MongoError).code === 11000){
            throw new Error("Email is Already Used")
        }
        else{
            throw new Error(String(error));
        }
    }

}