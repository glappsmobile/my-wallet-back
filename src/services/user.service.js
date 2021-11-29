import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository.js';

const createUser = async ({ name, password, email }) => {
  const user = await userRepository.findUserByEmail({ email });

  if (user) {
    return null;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const createdUser = await userRepository.createUser({ name, email, password: hashedPassword });
  return createdUser;
};

const findUserById = async ({ userId }) => {
  const user = await userRepository.findUserById({ userId });

  if (!user) {
    return null;
  }

  return user;
};

export {
  createUser,
  findUserById,
};
