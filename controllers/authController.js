const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.JWT_SECRET;
const maxAge = 60 * 60 * 1000;

const doctorService = require('../services/doctorService');

async function register(req, res, next) {
    try {
        const { name, phone, password } = req.body;

        const newDoctor = await doctorService.register(name, phone, password);

        console.log(`User Id : ${newDoctor.id}, Phone : ${newDoctor.phone}, registered Successfully`);
        
        return res.status(201).json({"sucsses": true});

    } catch (error) {
        await next(error);
    }
}


async function login(req, res, next) {
    try {
        const { phone, password } = req.body;

        console.log(`${phone} is trying to logIn`);
        
        const doctor = await doctorService.login(phone, password);
        
        if (!doctor) {
            console.log(`${phone} couldn't logIn`);
            let error = new Error("Not Found");
            error.meta = { code: "404", error: 'Wrong phone or password' };
            throw error;
        }
        const token = jwt.sign({ id: doctor.id, role: "Doctor" }, secretKey, { expiresIn: '1h' });
        res.cookie("jwt", token,  { httpOnly: true, maxAge: maxAge});

        console.log(`Doctor Id : ${doctor.id}, Phone : ${doctor.phone}, logedin Successfully`);

        return res.status(201).json({jwt: token});

    } catch (error) {   
        next(error);
    }
}

async function logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({logout : "True"});
}

async function token(req, res) {
    return res.status(200).json({stauts: "Valid"});
}

module.exports = { login, logout, register, token };
