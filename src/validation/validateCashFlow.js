import joi from 'joi';

const validateCashFlow = joi.object({
    description: joi.string().required(),
    value: joi.number().required(),
});


export default validateCashFlow;