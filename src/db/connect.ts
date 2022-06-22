import mongoose from "mongoose";
import log from "../log";
import { extractStringEnvVar } from "../public/dotenvExtractor";

const mongooseUri = extractStringEnvVar('DB_URI')
async function connectDb():Promise<void>{
    mongoose.connect(mongooseUri).then(()=>{
        log.info("Connected to Mongoose")
    }).catch((err)=>{
        log.error("Error connecting to Mongoose")
    })
}

export default connectDb;