import express from "express";

const app = express();


app.get('/', (req, res) => {
    res.send("İndex sayfası")
})

const PORT = 3000;


app.listen(PORT, () => {
    console.log("App is running")
})

