import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, { dbName: 'LensLight_tr_2' })
        .then(() => {
            console.log("connected db")
        })
        .catch((err) => {
            console.log(`Error is ${err}`)
        })
}

export default conn;
