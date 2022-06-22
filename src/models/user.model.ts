import mongoose from "mongoose";
import {  UserDocument } from "../@types";
import bcrypt from "bcrypt";
import config from "config";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})



UserSchema.methods.comparePassword= async function(password: string){
    const user = this as UserDocument;
    return await bcrypt.compare(password,user.password).catch(err=>{
        throw err;
    })
}


UserSchema.pre<UserDocument>("save",async function(this:UserDocument,next){
    let user = this;
    if(!user.isModified("password")) return next();
        
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password,salt);

    user.password = hash;
    return next();
});


const User = mongoose.model<UserDocument>("user",UserSchema)
export default User;