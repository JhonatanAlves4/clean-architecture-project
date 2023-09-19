import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/custumer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";

describe("Test find customer use case", () => {
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

  it("should find a customer", async () => {
    const customerRespository = new CustomerRepository();
    const usecase = new FindCustomerUsecase(customerRespository);

    const customer = new Customer("1", "Jhonatan");
    const address = new Address(
      "Rodovia Tertuliano",
      2657,
      "88054-601",
      "Florianópolis"
    );
    customer.changeAddress(address);

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
});
