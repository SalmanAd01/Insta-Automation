import express,{Express} from "express"
import config from "config"
import routes from "./routes"
import connectDb from "./db/connect"
const PORT:number = config.get('port')

const app:Express = express();
app.use(express.json())




app.listen(PORT,async()=>{
    console.log(`http://localhost:${PORT}`)
    routes(app)
    await connectDb()
})

