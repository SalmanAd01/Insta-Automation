import { Express } from 'express';
import { reqRes } from './@types';

function initRoutes(app:Express):void{

    app.get("/",({req,res}:reqRes) =>{
        res.send("Hello")
    })

}


export default initRoutes;