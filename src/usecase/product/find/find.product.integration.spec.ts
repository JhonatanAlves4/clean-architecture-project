import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUsecase from "./find.product.usecase";

describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productFindUsecase = new FindProductUsecase(productRepository);

    const product = new Product("1", "Monitor 24'", 700);

    await productRepository.create(product);

    const input = {
      id: "1",
    };

    const result = await productFindUsecase.execute(input);

    const output = {
      id: "1",
      name: "Monitor 24'",
      price: 700,
    };

    expect(result).toEqual(output);
  })
})