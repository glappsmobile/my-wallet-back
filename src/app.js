import './setup.js';
import express from 'express';
import cors from 'cors';
import auth from './middlewares/auth.js';
import * as userController from './controllers/user.controller.js';
import * as transactionsController from './controllers/transactions.controller.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', userController.signUp);

app.post('/sign-in', userController.signIn);

app.get('/user', auth, userController.getUser);

app.post('/transactions', auth, transactionsController.createTransaction);

app.get('/transactions', auth, transactionsController.getTransactions);

export default app;
