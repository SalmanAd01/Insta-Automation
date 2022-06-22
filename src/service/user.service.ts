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
export const verifyUser = async (user:DocumentDefinition<Omit<UserDocument,'name'>>) =>{
    try{
        const checkEmail= await User.findOne({email:user.email});
        if(!checkEmail){
            throw new Error("Email is not Registered");
        }
        else{
            const checkBoth= await checkEmail.comparePassword(user.password);
            if(!checkBoth){
                throw new Error("Email and Password is Incorrect");
            }
            else{
                return checkBoth;
            }
        }
    }
    catch(error){
        throw new Error(String(error));
    }
}