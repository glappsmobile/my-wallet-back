import * as transactionsService from '../services/transactions.service.js';
import * as transctionsSchema from '../schemas/transactions.schema.js';

const createTransaction = async (req, res) => {
  if (transctionsSchema.createTransaction.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const { value } = req.body;
  const { user } = res.locals;

  const transaction = await transactionsService.createTransaction({ userId: user.id, value });

  if (transaction.length === 0) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

export {
  createTransaction,
};
