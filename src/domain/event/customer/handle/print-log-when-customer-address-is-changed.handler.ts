import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class PrintLogWhenAddressIsChangedHandler
  implements EventHandlerInterface
{
  handle(event: EventInterface): void {
    const eventData = event.eventData;
    console.log(
      `Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.Address}`
    );
  }
}
