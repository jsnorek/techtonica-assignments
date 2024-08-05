class Event {
    constructor(name, description) {
      this.name = name;
      this.description = description;
      this.availableTickets = [];
    }
      addAvailableTickets(ticketName, ticketPrice) {
        const ticket = new TicketType(ticketName, ticketPrice);
        this.availableTickets.push(ticket);
      }
      /*
      allTickets() {
        return "All tickets: " + this.availableTickets.map(tickets, index) => `${index + 1}`
      } */
  }
  
  // The below statement creates an object.
  const eventObj1 = new Event(
    'KLOS Golden Gala',
    'An evening with hollywood vampires'
  );
  
  const eventObj2 = new Event('Skillet & Sevendust', 'Victorious war tour');
  const eventObj3 = new Event('Jenny Lewis', 'On the line tour 2019');
  
  const eventArray = new Array();
  
  // pushing single object to an array
  //eventArray.push(eventObj1);
  // pushing multiple objects to an array at once
  eventArray.push(eventObj1, eventObj2, eventObj3);
  
  // in order to check whether the elements are pushed, use console.log
  console.log(eventArray);
  
  document.addEventListener('DOMContentLoaded', () => {
    // Handler when the DOM is fully loaded
    let html = '';
    eventArray.forEach((item) => {
      html += `<li>${item.name} - ${item.description}`;
    });
    document.querySelector('#event').innerHTML = html;
  });
  
  class TicketType {
    constructor (ticketName, ticketDescription) {
      this.ticketName = ticketName;
      this.ticketDescription = ticketDescription;
    }
  }
