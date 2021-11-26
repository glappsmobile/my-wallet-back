import connection from '../database/connection.js';

const createUser = async ({ name, email, password }) => {
  try {
    const user = await connection.query(
      'INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *;',
      [name, email, password],
    );

    return user.rows;
  } catch (err) {
    return [];
  }
};

const createSession = async ({ userId, token }) => {
  try {
    const user = await connection.query(
      'INSERT INTO "sessions" ("user_id", "token") VALUES ($1, $2) RETURNING *;',
      [userId, token],
    );
    return user.rows[0];
  } catch (err) {
    return {};
  }
};

const findUserByEmail = async ({ email }) => {
  const existingUserWithGivenEmail = await connection.query(
    'SELECT * FROM "users" WHERE "email"=$1',
    [email],
  );

  return existingUserWithGivenEmail.rows[0];
};

export {
  createUser, createSession, findUserByEmail,
};
