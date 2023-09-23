import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import UpdateProductUsecase from "./update.product.usecase";

const product = new Product(uuid(), "Monitor 24'", 700);

const input = {
  id: product.id,
  name: "Monitor 27'",
  price: 900,
};

const mockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(), // update returns void
  };
};

describe("Unit test product update use case", () => {
  it("should update a product", async () => {
    const productRepository = mockRepository();
    const productUpdateUsecase = new UpdateProductUsecase(productRepository);

    const output = await productUpdateUsecase.execute(input);

    expect(output).toEqual(input);
  });
});
