import connection from '../database/connection.js';

const createUser = async ({ name, email, password }) => {
  try {
    const userQuery = await connection.query(
      'INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *;',
      [name, email, password],
    );

    return userQuery.rows;
  } catch (err) {
    return [];
  }
};

const createSession = async ({ userId, token }) => {
  try {
    const userQuery = await connection.query(
      'INSERT INTO "sessions" ("user_id", "token") VALUES ($1, $2) RETURNING *;',
      [userId, token],
    );
    return userQuery.rows[0];
  } catch (err) {
    return {};
  }
};

const findUserByEmail = async ({ email }) => {
  const userQuery = await connection.query(
    'SELECT * FROM "users" WHERE "email"=$1',
    [email],
  );

  return userQuery.rows[0];
};

const findUserById = async ({ userId }) => {
  const userQuery = await connection.query(
    'SELECT name FROM "users" WHERE "id"=$1',
    [userId],
  );

  return userQuery.rows[0];
};

export {
  createUser, createSession, findUserByEmail, findUserById,
};
