import faker from 'faker';
import * as transactionsController from '../../src/controllers/transactions.controller.js';

const createTransactionBody = ({ value } = {}) => ({
  value: value || faker.datatype.float({
    min: -100000000,
    max: 100000000,
  }),
});

const createTransaction = async ({ value } = {}) => {
  const transactionBody = createTransactionBody({ value });
  await transactionsController.createTransaction({
    ...transactionBody,
  });

  return {
    value: transactionBody.value,
  };
};

export {
  createTransactionBody,
  createTransaction,
};
