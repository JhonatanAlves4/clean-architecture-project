import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUsecase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Jhonatan",
  new Address("Rodovia", 2756, "88054-601", "Florianóplis")
);

const customer2 = CustomerFactory.createWithAddress(
  "Lorena",
  new Address("Rua", 2756, "82454-481", "São José")
);

const mockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe("Unit test for listing customer usecase", () => {
  it("should list a customer", async () => {
    const customerRepository = mockRepository();
    const customerListUsecase = new ListCustomerUsecase(customerRepository);
    const output = await customerListUsecase.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});
