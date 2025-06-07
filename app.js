import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";

dotenv.config();
conn();

const app = express();
const port = process.env.PORT;




app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes
app.get("/*splat", checkUser)
app.use('/', pageRoute)
app.use('/photos', photoRoute)
app.use('/users', userRoute)



app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

