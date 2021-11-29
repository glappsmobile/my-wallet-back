import * as transactionsService from '../services/transactions.service.js';
import * as transctionsSchema from '../schemas/transactions.schema.js';

const createTransaction = async (req, res) => {
  if (transctionsSchema.createTransaction.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const { value, description } = req.body;
  const { user } = res.locals;

  const transaction = await transactionsService
    .createTransaction({ userId: user.id, value, description });

  if (transaction.length === 0) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

const getTransactions = async (req, res) => {
  const { user } = res.locals;
  const transactions = await transactionsService.getTransactions({ userId: user.id });
  if (transactions === null) {
    return res.sendStatus(500);
  }

  return res.send(transactions);
};

export {
  createTransaction,
  getTransactions,
};
