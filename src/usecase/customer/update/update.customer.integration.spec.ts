import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUsecase from "./update.customer.usecase";

describe("Test update customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customerUpdateUsecase = new UpdateCustomerUsecase(customerRepository);

    const customer = CustomerFactory.createWithAddress(
      "Jhonatan",
      new Address("Rodovia", 2756, "88054-601", "Florianópolis")
    );
    await customerRepository.create(customer);
    
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

    const output = await customerUpdateUsecase.execute(input);

    expect(output).toEqual(input);
  })
})