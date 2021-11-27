import "../../src/setup.js";
import supertest from "supertest";
import app from "../../src/app.js";
import { clearDatabase, closeConnection } from "../utils/database.js";
import * as sessionFactory from "../factories/session.factory.js";
import * as transactionsFactory from "../factories/transactions.factory.js";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

const agent = supertest(app);

describe("POST /transactions", () => {
  const createToken = async () => {
    const { token } = await sessionFactory.createSession();
    return { token }
  }

  it("should answer with status 401 when no token is given", async () => {
    const body = {};

    const response = await agent.post("/transactions").send(body);
    expect(response.status).toEqual(401);
  });

  it("should answer with status 401 when invalid token is given", async () => {
    const body = {};

    const response = await agent.post("/transactions").send(body).set("Authorization", "Bearer invalid_token");
    expect(response.status).toEqual(401);
  });

  it("should answer with status 400 when body is invalid and token is valid", async () => {
    const { token } = await createToken();
    const body = {};

    const response = await agent.post("/transactions").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 201 when everything is valid", async () => {
    const { token } = await createToken();
    const body = transactionsFactory.createTransactionBody();
    
    const response = await agent.post("/transactions").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
});