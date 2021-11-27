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

const findTransactionsByUserId = async ({ userId }) => {
  try {
    const transactionsQuery = await connection.query(
      `SELECT id, value, created_at
       FROM "transactions" 
       WHERE "user_id"=$1 AND deleted_at IS NULL 
       ORDER BY "id" DESC`,
      [userId],
    );

    return transactionsQuery.rows;
  } catch (err) {
    return null;
  }
};

export {
  createTransaction,
  findTransactionsByUserId,
};
