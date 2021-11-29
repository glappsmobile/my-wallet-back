import joi from 'joi';

const createTransaction = joi.object({
  value: joi.number().required(),
  description: joi.string(),
});

export { createTransaction };
