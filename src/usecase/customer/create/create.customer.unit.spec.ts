import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
  name: "Jhonatan",
  address: {
    street: "Rodovia",
    number: 2756,
    zip: "88054-601",
    city: "Florianópolis",
  },
};

const mockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = mockRepository();
    const customerCreateUsecase = new CreateCustomerUsecase(customerRepository);

    const output = await customerCreateUsecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = mockRepository();
    const customerCreateUsecase = new CreateCustomerUsecase(customerRepository);

    input.name = "";

    await expect(customerCreateUsecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = mockRepository();
    const customerCreateUsecase = new CreateCustomerUsecase(customerRepository);

    input.address.street = "";

    await expect(customerCreateUsecase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
