import connection from '../database/connection.js';

const createTransaction = async ({ userId, value }) => {
  try {
    const transactionQuery = await connection.query(
      'INSERT INTO "transactions" ("user_id", "value") VALUES ($1, $2) RETURNING *;',
      [userId, value],
    );

    return transactionQuery.rows;
  } catch (err) {
    return [];
  }
};

export {
  createTransaction,
};
