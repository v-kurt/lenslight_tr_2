import express from "express";

const app = express();


app.get('/', (req, res) => {
    res.send("İndex sayfası")
})

app.get('/about', (req, res) => {
    res.send("About Sayfası")
})

const PORT = 3000;


app.listen(PORT, () => {
    console.log("App is running")
})

