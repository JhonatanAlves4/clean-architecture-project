import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/custumer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";


// ID Relation
let customer = new Customer("123", "Jhonatan Alves");
const address = new Address("Rua Tertuliano Brito Xavier", 2756, "88054-601", "Florianópolis");
customer.Address = address;
customer.activate();


// Object Entity Relation
const item1 = new OrderItem("1", "Item 1", 50, "1", 3);
const item2 = new OrderItem("2", "Item 2", 20, "2", 2);
const order = new Order("1", "123", [item1, item2]);
