import { AnySchema } from "yup";
import log from "../log"
import {Request,Response,NextFunction} from "express"

export const validate = (schema:AnySchema)=> async(req:Request, res:Response,next:NextFunction)=>{
    try{
        await schema.validate({
            body:req.body,
            params:req.params,
            query:req.query
        })
        log.info("Validating schema")
        return next()
    }
    catch (err){
        log.error(err)
        if(err instanceof Error){
            return res.status(409).send(err.message)
        }
    }
}