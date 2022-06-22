import express,{Express} from "express"
import routes from "./routes"
import connectDb from "./db/connect"
import * as dotenv from "dotenv";
dotenv.config()


const PORT = process.env.PORT! || 5001
const app:Express = express();
app.use(express.json())




app.listen(PORT,async()=>{
    console.log(`http://localhost:${PORT}`)
    routes(app)
    await connectDb()
})

