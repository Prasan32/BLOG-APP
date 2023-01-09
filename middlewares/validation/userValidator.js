const joi = require('joi')

let userValidator = (req, res, next) => {

    //validate incoming request
    const registerSchema = joi.object({
        first_name: joi.string().required().min(3),
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
    } else {
        return next()
    }
}


module.exports = userValidator