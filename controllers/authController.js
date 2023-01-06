const User = require('../models/User')
const joi = require('joi')
const bcrypt = require('bcryptjs')

exports.saveUser = async (req, res, next) => {

    //validate incoming request
    const registerSchema = joi.object({
        first_name: joi.string().required(),
        middle_name: joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.number().required(),
        username: joi.string().min(3).max(30).required(),
        password: joi.string().min(8).required()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$)"))
            .messages({
                "string.pattern.base": `Password length should be minimum of 8 characters with at least one uppercase, one lowercase, one number and one special character.`,
                "string.empty": `Password cannot be empty`,
                "any.required": `Password is required`,
            }),
        image: joi.string()
    })

    const { error } = registerSchema.validate(req.body)

    if (error) {
        return next(error)
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    let jsonObject = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: hashedPassword,
        ...(req.body.image && { image: req.body.image })
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