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

const createToken = async () => {
  const { token } = await sessionFactory.createSession();
  return { token }
}

describe("POST /transactions", () => {
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


describe("GET /transactions", () => {
  it("should answer with status 401 when no token is given", async () => {
    const response = await agent.get("/transactions");

    expect(response.status).toEqual(401);
  });

  it("should answer with status 401 when invalid token is given", async () => {
    const response = await agent.get("/transactions").set("Authorization", "Bearer invalid_token");

    expect(response.status).toEqual(401);
  });

  it("should answer with status 200 when everything is valid", async () => {
    const { token } = await createToken();

    const response = await agent.get("/transactions").set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("should answer with all financial events when everything is valid", async () => {
    const { token } = await createToken();
    const firstTransaction = transactionsFactory.createTransactionBody();
    const secondTransaction = transactionsFactory.createTransactionBody();
    const expectedTotal = (firstTransaction.value + secondTransaction.value).toFixed(2);

    await agent.post("/transactions").send(firstTransaction).set("Authorization", `Bearer ${token}`);
    await agent.post("/transactions").send(secondTransaction).set("Authorization", `Bearer ${token}`);

    const response = await agent.get("/transactions").set("Authorization", `Bearer ${token}`);
    expect(response.body).toHaveProperty('total');
    expect(response.body.total).toEqual(expectedTotal);
    expect(response.body).toHaveProperty('transactions');
    expect(response.status).toEqual(200);
  });
});