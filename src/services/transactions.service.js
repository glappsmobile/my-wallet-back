import * as transactionsRepository from '../repositories/transactions.repository.js';

// eslint-disable-next-line arrow-body-style
const createTransaction = async ({ userId, value }) => {
  return transactionsRepository.createTransaction({ userId, value });
};

export {
  createTransaction,
};
