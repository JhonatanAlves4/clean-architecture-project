import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Jhonatan",
  new Address("Rodovia", 2756, "88054-601", "Florianópolis")
);

const input = {
  id: customer.id,
  name: "Jhonatan Alves",
  address: {
    street: "Rodovia Tertuliano",
    number: 193,
    zip: "88054-602",
    city: "Floripa",
  },
};

const mockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(), // update returns void
  };
};

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = mockRepository();
    const customerUpdateUsecase = new UpdateCustomerUsecase(customerRepository);

    const output = await customerUpdateUsecase.execute(input);

    expect(output).toEqual(input);
  })
});
