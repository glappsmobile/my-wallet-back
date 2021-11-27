import joi from 'joi';

const createTransaction = joi.object({
  value: joi.number().required(),
});

export { createTransaction };
