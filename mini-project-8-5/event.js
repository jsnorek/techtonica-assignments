class TicketType {
  constructor (ticketName, price) {
    this.ticketName = ticketName;
    this.price = price;
  }
}

class Event {
    constructor(name, description) {
      this.name = name;
      this.description = description;
      this.availableTickets = [];
      }
      addAvailableTickets(ticketName, price) {
        const newTicket = new TicketType(ticketName, price)
        this.availableTickets.push(newTicket);
      }
      allTickets() {
        return "All tickets: " + this.availableTickets.map((ticket, index) => `${index + 1}. ${ticket.name} ($${ticket.price})`).join(" ")
      }

      searchTickets(lowerPrice, upperPrice) {
        const eligibleTickets = this.availableTickets.filter(ticket => ticket.price >= lowerPrice && ticket.price <= upperPrice);
        if(eligibleTickets.length === 0) {
          return "No tickets available";
        }
        return "Eligible tickets: " + eligibleTickets.map((ticket, index) => `${index + 1}. ${ticket.ticketName} ($${ticket.price})`).join(" ");
      }
    }

  
  // The below statement creates an object.
  const eventObj1 = new Event(
    'KLOS Golden Gala',
    'An evening with hollywood vampires'
  );
  eventObj1.addAvailableTickets("human", 299);
  eventObj1.addAvailableTickets("vampire", 99);

  
  const eventObj2 = new Event(
    'Skillet & Sevendust', 
    'Victorious war tour'
  );
  eventObj2.addAvailableTickets("General Admission", 25);
  eventObj2.addAvailableTickets("Floor Seating ", 80);

  const eventObj3 = new Event('Jenny Lewis', 'On the line tour 2019');
  eventObj3.addAvailableTickets("Orchestra", 300);
  eventObj3.addAvailableTickets("Mezzanine", 200);
  eventObj3.addAvailableTickets("Balcony", 100);

  console.log(eventObj1.availableTickets);
  
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
    eventArray.forEach((event) => {
      html += `<li>${event.name} - ${event.description} - ${event.allTickets()}</li>)`;
    });
    document.querySelector('#event').innerHTML = html;
  });

  document.addEventListener('DOMContentLoaded', () => {
    let html = '';
    eventArray.forEach((event) => {
      html += `<li> ${event.name} - ${event.description} - ${event.searchTickets(0, 100)}</li>`
    })
    document.querySelector('#event').innerHTML = html;
}) 

console.log("Test case 1:", eventObj3.searchTickets(0, 250)); 
  

