import connection from "./database/connection.js";
import validateSignUp from "./validation/validateSignUp.js";
import express from 'express';
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/alive',  (req, res) => {
    res.send("I'm alive");
});

app.post('/sign-up', async (req, res) => {

  if (validateSignUp.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const { name, email, password } = req.body;

  //CHECK IF EMAIL EXISTS
  try {
    const query = await connection.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1;",
      [email]
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
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hash]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000, () => {
  console.log('Server listening on port 4000.');
});
