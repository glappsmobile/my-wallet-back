import './setup.js';
import express from 'express';
import cors from 'cors';
import validateCashFlow from './validation/validateCashFlow.js';
import connection from './database/connection.js';
import * as userController from './controllers/user.controller.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', userController.signUp);

app.post('/sign-in', userController.signIn);

app.post('/cashflow', async (req, res) => {
  const { description, value } = req.body;
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  if (validateCashFlow.validate(req.body).error) {
    return res.sendStatus(400);
  }

  try {
    const userQuery = await connection.query(
      `
      SELECT users.* 
      FROM users 
        JOIN sessions
          ON users.id = sessions.user_id
      WHERE token = $1;`,
      [token],
    );

    const user = userQuery.rows[0];

    if (!user) {
      return res.sendStatus(401);
    }

    await connection.query(
      `
      INSERT INTO cashflow (user_id, date, description, value) 
      VALUES ($1, $2, $3, $4);`,
      [user.id, 'now()', description, value],
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get('/cashflow', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const userQuery = await connection.query(
      `
      SELECT users.* 
      FROM users 
        JOIN sessions
          ON users.id = sessions.user_id
      WHERE token = $1;`,
      [token],
    );

    const user = userQuery.rows[0];

    if (!user) {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }

  try {
    const cashFlowQuery = await connection.query(
      `
      SELECT cashflow.*
      FROM cashflow 
        JOIN sessions 
          ON cashflow.user_id = sessions.user_id
      WHERE sessions.token = $1;`,
      [token],
    );

    const cashFlow = cashFlowQuery.rows;
    /*
    cashFlow.map(
      (flow) => (flow.date = dayjs(flow.date).format('YYYY-MM-DD')),
    ); */

    return res.send(cashFlow);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default app;
