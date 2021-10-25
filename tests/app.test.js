import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/connection';

describe("POST /sign-up", () => {


    afterAll(async () => {
        await connection.query("DELETE FROM users WHERE email = 'emaildeteste@teste.com';");
    });

    it("returns 400 if body is malformed", async () => {
        const result = await supertest(app).post("/sign-up").send({
            namea: "Nome de teste",
            email: "emaildeteste@teste.com",
        });
        expect(result.status).toEqual(400);
    });

    it("returns 409 if email exists", async () => {
        const result = await supertest(app).post("/sign-up").send({
            name: "Nome de teste",
            email: "email@teste.com",
            password: "12345678"
        });
        expect(result.status).toEqual(409);
    });


    it("returns 201 for correct sign-up", async () => {
        const result = await supertest(app).post("/sign-up").send({
            name: "Nome de teste",
            email: "emaildeteste@teste.com",
            password: "12345678"
        });
        expect(result.status).toEqual(201);
    });
});