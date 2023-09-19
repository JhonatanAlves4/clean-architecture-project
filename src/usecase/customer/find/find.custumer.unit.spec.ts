import Customer from "../../../domain/customer/entity/custumer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer("1", "Jhonatan");
const address = new Address(
  "Rodovia Tertuliano",
  2657,
  "88054-601",
  "Florianópolis"
);
customer.changeAddress(address);

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRespository = mockRepository();
    const usecase = new FindCustomerUsecase(customerRespository);

    await customerRespository.create(customer);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Jhonatan",
      address: {
        street: "Rodovia Tertuliano",
        number: 2657,
        zip: "88054-601",
        city: "Florianópolis",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRespository = mockRepository();
    customerRespository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUsecase(customerRespository);

    const input = {
      id: "1",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
