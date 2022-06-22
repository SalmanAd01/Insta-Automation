import { Express } from 'express';
import { createUserHandler,loginUserHandler } from './controller/user.controller';
import {validate} from "./middleware/validateRequest"
import { userSignupSchema,userLoginSchema } from './schema/user.schema';


function initRoutes(app:Express):void{

    app.post("/api/signup",validate(userSignupSchema),createUserHandler)
    app.post("/api/login",validate(userLoginSchema),loginUserHandler)

}


export default initRoutes;