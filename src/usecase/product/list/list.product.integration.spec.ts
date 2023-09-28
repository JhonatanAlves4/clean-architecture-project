import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUsecase from "./list.product.usecase";
import { v4 as uuid } from "uuid";

const product1 = new Product(uuid(), "Mousepad Redragon", 90);
const product2 = new Product(uuid(), "Mouse Gamer Redragon", 120);
describe("Test list products use case", () => {
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

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const productListUsecase = new ListProductUsecase(productRepository);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await productListUsecase.execute({});

    expect(output.products.length).toBe(2);
    
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);

  })
})