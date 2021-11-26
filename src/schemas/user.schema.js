import joi from 'joi';

const signUp = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export { signUp, signIn };
