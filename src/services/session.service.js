import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository.js';
import * as sessionRepository from '../repositories/session.repository.js';

const createSession = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail({ email });

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return null;
  }

  let token;
  const createNewToken = () => {
    token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
  };

  const existingSession = await sessionRepository.findSessionByUserId({ userId: user.id });
  if (!existingSession) {
    createNewToken();
  } else {
    try {
      jwt.verify(existingSession.token, process.env.JWT_SECRET);
      token = existingSession.token;
    } catch (err) {
      createNewToken();
    }
  }

  return userRepository.createSession({ userId: user.id, token });
};

export {
  createSession,
};
