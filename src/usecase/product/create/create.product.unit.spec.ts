import CreateProductUsecase from "./create.product.usecase";

const input = {
  name: "Monitor 24",
  price: 700,
};

const mockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = mockRepository();
    const productCreateUsecase = new CreateProductUsecase(productRepository);

    const output = await productCreateUsecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = mockRepository();
    const productCreateUsecase = new CreateProductUsecase(productRepository);

    input.name = "";
    await expect(productCreateUsecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
    input.name = "Monitor 24'";
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = mockRepository();
    const productCreateUsecase = new CreateProductUsecase(productRepository);

    input.price = -10;
    await expect(productCreateUsecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
