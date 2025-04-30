import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";

dotenv.config();
conn();

const app = express();
const port = process.env.PORT;




app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.json())

app.use('/', pageRoute)
app.use('/photos', photoRoute)



app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

