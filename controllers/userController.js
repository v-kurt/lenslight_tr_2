import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201)
            .redirect("/login")

    } catch (error) {

        let errors2 = {}

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            })
        }



        res.status(400).json({
            succeded: false,
            error
        })

    }
}


const loginUser = async (req, res) => {


    try {


        const { username, password } = req.body;

        const user = await User.findOne({ username });


        let same = false


        if (user) {
            same = await bcrypt.compare(password, user.password)
        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such person'
            })
        }

        if (same) {

            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })
            res.status(200).redirect('/users/dashboard')



        } else {
            res.status(401).json({
                succeded: false,
                error: 'You are not authorized'
            })

        }


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error: 'Internal Error'
        })

    }


}


const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
}

const getDashboardPage = (req, res) => {
    res.render("dashboard", {
        link: "dashboard",
    });
};


export { createUser, loginUser, getDashboardPage }