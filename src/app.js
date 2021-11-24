import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import validateCashFlow from './validation/validateCashFlow.js';
import validateSignUp from './validation/validateSignUp.js';
import connection from './database/connection.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', async (req, res) => {
  if (validateSignUp.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const { name, email, password } = req.body;

  try {
    const query = await connection.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1;',
      [email],
    );

    const user = query.rows[0];

    if (user) {
      return res.sendStatus(409);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }

  const hash = bcrypt.hashSync(password, 11);

  try {
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hash],
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  // CHECK IF EMAIL EXISTS AND IF PASS IS VALID
  try {
    const query = await connection.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1;',
      [email],
    );
    const user = query.rows[0];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    // DELETE PREVIOUS SESSION
    const session = await connection.query(
      'SELECT * FROM sessions WHERE user_id = $1 LIMIT 1',
      [user.id],
    );

    if (session.rows[0]) {
      await connection.query(
        'DELETE FROM sessions WHERE user_id = $1',
        [user.id],
      );
    }

    const token = uuid();

    await connection.query(
      'INSERT INTO sessions (user_id, token) VALUES ($1, $2)',
      [user.id, token],
    );

    return res.send({ token, name: user.name });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

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
