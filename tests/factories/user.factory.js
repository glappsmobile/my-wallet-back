import bcrypt from 'bcrypt';
import faker from 'faker';
import * as userRepository from '../../src/repositories/user.repository.js';

const createUser = async ({ name, email, password } = {}) => {
  const fakePassword = password || faker.internet.password();
  const fakeName = name || faker.name.findName();
  const fakeEmail = email || faker.internet.email();
  const hashedPassword = bcrypt.hashSync(password || fakePassword, 10);

  const createdUser = await userRepository.createUser(
    {
      name: fakeName,
      email: fakeEmail,
      password: hashedPassword,
    },
  );

  return {
    id: createdUser.id,
    password: fakePassword,
    name: fakeName,
    email: fakeEmail,
  };
};

const createUserBody = ({ name, email, password } = {}) => {
  const fakePassword = password || faker.internet.password();
  const fakeName = name || faker.name.findName();
  const fakeEmail = email || faker.internet.email();

  return {
    password: fakePassword,
    name: fakeName,
    email: fakeEmail,
  };
};

export {
  createUser,
  createUserBody,
};
