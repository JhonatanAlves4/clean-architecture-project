import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productCreateUsecase = new CreateProductUsecase(productRepository);

    const input = new Product(uuid(), "Monitor 24'", 700);

    const result = await productCreateUsecase.execute(input);

    const output = {
      id: expect.any(String),
      name: "Monitor 24'",
      price: 700,
    }

    expect(result).toEqual(output);
  });
});
