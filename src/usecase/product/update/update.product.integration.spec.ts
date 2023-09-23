import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { v4 as uuid } from "uuid";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUsecase = new UpdateProductUsecase(productRepository);

    const product = new Product(uuid(), "Monitor 24'", 700);
    await productRepository.create(product);

    const input = {
      id: product.id,
      name: "Monitor 27'",
      price: 900,
    };

    const output = await productUpdateUsecase.execute(input);

    expect(output).toEqual(input);
  });
});
