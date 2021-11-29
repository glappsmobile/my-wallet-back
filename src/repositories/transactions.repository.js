import connection from '../database/connection.js';

const createTransaction = async ({ userId, value, description }) => {
  try {
    const transactionQuery = await connection.query(
      'INSERT INTO "transactions" ("user_id", "value", "description") VALUES ($1, $2, $3) RETURNING *;',
      [userId, value, description],
    );

    return transactionQuery.rows;
  } catch (err) {
    return [];
  }
};

const findTransactionsByUserId = async ({ userId }) => {
  try {
    const transactionsQuery = await connection.query(
      `SELECT id, value, description, created_at
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
