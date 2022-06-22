import mongoose from "mongoose";
import config from "config";
import log from "../log";

const mongooseUri:string = config.get('dbUri')
async function connectDb():Promise<void>{
    mongoose.connect(mongooseUri).then(()=>{
        log.info("Connected to Mongoose")
    }).catch((err)=>{
        log.error("Error connecting to Mongoose")
    })
}

export default connectDb;