import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Jhonatan");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhonatan");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address(
      "Rodovia Tertuliano Brito Xavier",
      2756,
      "88054-601",
      "Florianópolis"
    );
    let customer = CustomerFactory.createWithAddress("Jhonatan", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhonatan");
    expect(customer.Address).toBe(address);
  });
});
