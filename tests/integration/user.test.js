import "../../src/setup.js";
import supertest from "supertest";
import app from "../../src/app.js";
import * as sessionFactory from "../factories/session.factory.js";
import { clearDatabase, closeConnection } from "../utils/database.js";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

const agent = supertest(app);

describe("GET /user", () => {

const createToken = async () => {
  const { token } = await sessionFactory.createSession();
  return { token }
}

  it("should answer with status 401 when no token is given", async () => {
    const response = await agent.get("/user");
    expect(response.status).toEqual(401);
  });

  it("should answer with status 401 when invalid token is given", async () => {
    const response = await agent.get("/user").set("Authorization", "Bearer invalid_t12oken");
    expect(response.status).toEqual(401);
  });

  it("should answer with status 200 when token is valid", async () => {
    const { token } = await createToken();

    const response = await agent.get("/user").set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('name');
  });
});
