import supertest from "supertest";
import app from "../src/index";
import { prisma } from "../src/database.js";


beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE fruits CASCADE`;
});

describe("Testa rota GET /fruits", () => {

  it("Retorna um fruits e status code 200", async () => {
    const result = await supertest(app).get("/fruits").send();

    expect(result.status).toBe(200);
  });

  it("Retorna um fruits de id unico e status code 200", async () => {
    await supertest(app).get("/fruits/:id").send();
    const result = await supertest(app).get("/fruits/:id").send({id: 1});

    expect(result.status).toBe(200);
  });
});

describe("Testa rota POST /fruits", () => {
  it("Retornar novo cadastro de fruits com um status 201", async () => {
    const Newfruit = {
      name: "Melão",
      price: 12
    };

    const result = await supertest(app).post("/fruits").send(Newfruit);

    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
