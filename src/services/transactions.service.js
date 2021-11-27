import * as transactionsRepository from '../repositories/transactions.repository.js';

// eslint-disable-next-line arrow-body-style
const createTransaction = async ({ userId, value }) => {
  return transactionsRepository.createTransaction({ userId, value });
};

const getTransactions = async ({ userId }) => {
  const transactions = await transactionsRepository.findTransactionsByUserId({ userId });
  const total = transactions.reduce(
    (totalValue, transaction) => totalValue + Number(transaction.value),
    0,
  );

  return {
    transactions,
    total: total.toFixed(2),
  };
};

export {
  createTransaction,
  getTransactions,
};
