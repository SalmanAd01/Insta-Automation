import mongoose from "mongoose";
import {  UserDocument } from "../@types";
import bcrypt from "bcrypt";
import { extractNumberEnvVar } from "../public/dotenvExtractor";
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
    const saltLength = extractNumberEnvVar('SALT_LENGTH')   
    const salt = await bcrypt.genSalt(saltLength);
    const hash = await bcrypt.hashSync(user.password,salt);

    user.password = hash;
    return next();
});


const User = mongoose.model<UserDocument>("user",UserSchema)
export default User;