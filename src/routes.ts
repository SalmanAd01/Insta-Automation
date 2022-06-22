import { Express } from 'express';
import { createUserHandler } from './controller/user.controller';
import {validate} from "./middleware/validateRequest"
import { userSchema } from './schema/user.schema';


function initRoutes(app:Express):void{

    app.post("/api/user",validate(userSchema),createUserHandler)

}


export default initRoutes;