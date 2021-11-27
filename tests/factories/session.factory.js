import * as userFactory from './user.factory.js';
import * as sessionService from '../../src/services/session.service.js';

const createSession = async ({ name, email, password } = {}) => {
  const user = await userFactory.createUser({
    name,
    email,
    password,
  });

  const session = await sessionService.createSession({
    email: user.email,
    password: user.password,
  });

  return session;
};

export {
  createSession,
};
