import Product from "../../../domain/product/entity/product";
import FindProductUsecase from "./find.product.usecase";

const product = new Product("1", "Monitor 24'", 700);

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = mockRepository();
    const productFindUsecase = new FindProductUsecase(productRepository);

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
  });

  it("should not find a product", async () => {
    const productRepository = mockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const productFindUsecase = new FindProductUsecase(productRepository);

    const input = {
      id: "1",
    };

    expect(() => {
      return productFindUsecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
