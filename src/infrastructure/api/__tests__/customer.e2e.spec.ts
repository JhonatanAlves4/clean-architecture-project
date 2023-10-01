import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jhonatan",
        address: {
          street: "Rodovia",
          number: 2756,
          zip: "88054-601",
          city: "Florianópolis",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jhonatan");
    expect(response.body.address.street).toBe("Rodovia");
    expect(response.body.address.number).toBe(2756);
    expect(response.body.address.zip).toBe("88054-601");
    expect(response.body.address.city).toBe("Florianópolis");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Jhonatan",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jhonatan",
        address: {
          street: "Rodovia",
          number: 2756,
          zip: "88054-601",
          city: "Florianópolis",
        },
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Lorena",
        address: {
          street: "Rua",
          number: 8361,
          zip: "28544-407",
          city: "São José",
        },
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe("Jhonatan");
    expect(customer.address.street).toBe("Rodovia");

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Lorena");
    expect(customer2.address.street).toBe("Rua");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
  });
});
