import Customer from "../entity/custumer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

  it("should place an order", () => {
    const customer = new Customer("123", "Jhonatan Alves");
    const item1 = new OrderItem("1", "Item 1", 20, "1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(10);
    expect(order.total()).toBe(20);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Item 1", 40, "1", 2);
    const item2 = new OrderItem("2", "Item 2", 30, "2", 3);

    const order = new Order("1", "123", [item1]);
    const order2 = new Order("2", "123", [item2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(170);
  });
});
