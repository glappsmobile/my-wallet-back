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
    const user = await userFactory.createUser();

    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toEqual(409);
  });

  it("should answer with status 201 when given valid data", async () => {
    const body = userFactory.createUserBody();

    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toEqual(201);
  });
});

describe("POST /sign-in", () => {
  const createBody = ({ email, password } = {}) => {
    const body = userFactory.createUserBody({ email, password });
    return { 
      email: body.email, 
      password: body.password ,
    }
  }

  it("should answer with status 400 when body is invalid", async () => {
    const body = {};

    const response = await agent.post("/sign-in").send(body);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 401 when user doesnt exist", async () => {
    const body = createBody();

    const response = await agent.post("/sign-in").send(body);

    expect(response.status).toEqual(401);
  });

  it("should answer with status 401 when user exists but password is wrong", async () => {
    const body = createBody();

    await userFactory.createUser({ email: body.email, password: body.password.slice(1) });

    const response = await agent.post("/sign-in").send(body);

    expect(response.status).toEqual(401);
  });

  it("should answer with status 200 when user exists and password is correct", async () => {
    const body = createBody();

    await userFactory.createUser(body);

    const response = await agent.post("/sign-in").send(body);

    expect(response.status).toEqual(200);
  });
});

