import Order from "./order";
import OrderItem from "./order_item";

describe("Order unity tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when Item is empty", () => {
    expect(() => {
      let order = new Order("1", "123", []);
    }).toThrowError("Item quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 80, "1", 3);
    const item2 = new OrderItem("2", "Item 2", 45, "2", 2);
    const order = new Order("1", "123", [item, item2]);

    const total = order.total();

    expect(total).toBe(330);
  });

  it("should throw error if the item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 80, "1", 0);
      const order = new Order("1", "123", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
