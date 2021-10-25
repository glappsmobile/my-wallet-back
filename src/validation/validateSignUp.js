
import joi from 'joi';

const validateSignUp = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().pattern(new RegExp(/\S+@\S+\.\S+/)),
    password: joi.string().min(8).required()
});

export default validateSignUp;