import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository.js';

const createUser = async ({ name, password, email }) => {
  const user = await userRepository.findUserByEmail({ email });

  if (user) {
    return null;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const createdUser = userRepository.createUserDB({ name, email, password: hashedPassword });
  console.log(createdUser);
  return createdUser;
};

export {
  createUser,
};
