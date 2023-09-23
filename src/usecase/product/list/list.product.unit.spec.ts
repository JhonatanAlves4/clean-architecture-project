import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import ListProductUsecase from "./list.product.usecase";

const product1 = new Product(uuid(), "Mousepad Redragon", 90);
const product2 = new Product(uuid(), "Mouse Gamer Redragon", 120);

const mockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test list products use case", () => {
  it("should list products", async () => {
    const productRepository = mockRepository();
    const productListUsecase = new ListProductUsecase(productRepository);

    const output = await productListUsecase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
