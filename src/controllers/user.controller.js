import * as userSchema from '../schemas/user.schema.js';
import * as userService from '../services/user.service.js';

const signUp = async (req, res) => {
  if (userSchema.signUp.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const user = await userService.createUser(req.body);

  if (user === null) {
    return res.sendStatus(409);
  }

  if (user.length === 0) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

export {
  signUp,
};
