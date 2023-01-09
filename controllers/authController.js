const User = require('../models/User')
const joi = require('joi')
const bcrypt = require('bcryptjs')
const fs = require('fs')

exports.saveUser = async (req, res, next) => {
    
    let hashedPassword = await bcrypt.hash(req.body.password, 10) //encrypting password
    let jsonObject = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: hashedPassword,
        ...(req.file && { image: req.file.buffer.toString('base64') })
    }

    try {
        //check if email already exists
        const user = await User.findOne({ where: { email: req.body.email } })

        if (user === null) {
            //create new user
            const user = await User.create(jsonObject)
            res.status(201).json({ message: "Registered Successfully!!!" })
        } else {
            res.status(200).json({ message: "This email is already registered." })
        }
    } catch (error) {
        return next(error)
    }

}