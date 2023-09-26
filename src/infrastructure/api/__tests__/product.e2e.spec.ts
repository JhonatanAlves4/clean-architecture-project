import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Monitor 24'",
        price: 700,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Monitor 24'");
    expect(response.body.price).toBe(700);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Monitor 24'",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Monitor 24'",
        price: 700,
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Mouse Gamer Redragon",
        price: 125,
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const customer = listResponse.body.products[0];
    expect(customer.name).toBe("Monitor 24'");
    expect(customer.price).toBe(700);

    const customer2 = listResponse.body.products[1];
    expect(customer2.name).toBe("Mouse Gamer Redragon");
    expect(customer2.price).toBe(125);
  });
});
