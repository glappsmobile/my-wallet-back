import "../../src/setup.js";
import supertest from "supertest";
import app from "../../src/app.js";
import * as userFactory from "../factories/user.factory.js";
import { clearDatabase, closeConnection } from "../utils/database.js";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

const agent = supertest(app);

describe("POST /sign-up", () => {

  it("should answer with status 400 when body is invalid", async () => {
    const body = {
      name: 't',
      password: []
    }
    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 409 when there already is an user with given email", async () => {
    const body = userFactory.createUserBody();
    await userFactory.createUser(body);

    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toEqual(409);
  });

  it("should answer with status 201 when given valid data", async () => {
    const body = userFactory.createUserBody();

    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toEqual(201);
  });
});
