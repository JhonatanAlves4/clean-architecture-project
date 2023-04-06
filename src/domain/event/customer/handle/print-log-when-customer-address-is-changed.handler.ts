import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class PrintLogWhenAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: EventInterface): void {
    const eventData = event.eventData;
    console.log(
      `Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.Address}`
    );
  }
}
