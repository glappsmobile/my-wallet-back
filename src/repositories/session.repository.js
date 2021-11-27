import connection from '../database/connection.js';

const findSessionByUserId = async ({ userId }) => {
  const sessionQuery = await connection.query(
    'SELECT * FROM "sessions" WHERE "user_id"=$1',
    [userId],
  );

  return sessionQuery.rows[0];
};

export {
  findSessionByUserId,
};
