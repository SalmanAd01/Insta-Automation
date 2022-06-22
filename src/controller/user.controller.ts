import { omit } from "lodash";
import log from "../log";
import { createUser } from "../service/user.service";
import {Request,Response,NextFunction} from "express"

export async function createUserHandler(req:Request,res:Response){
    try{ 
        log.info(req.body)
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(),"password"));
    }
    catch(err){
        if(err instanceof Error){
            return res.status(409).send(err.message);
        }
        else{
            return res.status(500).send("Internal Server Error");
        }
    }
}