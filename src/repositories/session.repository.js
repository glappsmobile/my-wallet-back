import connection from '../database/connection.js';

const findSessionByUserId = async ({ userId }) => {
  const session = await connection.query(
    'SELECT * FROM "sessions" WHERE "user_id"=$1',
    [userId],
  );

  return session.rows[0];
};

export {
  findSessionByUserId,
};
