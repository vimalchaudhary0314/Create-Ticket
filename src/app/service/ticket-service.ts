import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private storageKey = 'tickets';

  constructor() {}

  // GET ALL TICKETS
  getTickets(): Ticket[] {

    const data = localStorage.getItem(this.storageKey);

    return data ? JSON.parse(data) : [];
  }

  // CREATE TICKET
  createTicket(ticket: Ticket): void {

    const tickets = this.getTickets();

    tickets.push(ticket);

    localStorage.setItem(this.storageKey, JSON.stringify(tickets));
  }

  // GET SINGLE TICKET
  getTicketById(id: number): Ticket | undefined {

    const tickets = this.getTickets();

    return tickets.find(ticket => ticket.id === id);
  }

  // UPDATE TICKET
  updateTicket(updatedTicket: Ticket): void {

    const tickets = this.getTickets();

    const index = tickets.findIndex(
      ticket => ticket.id === updatedTicket.id
    );

    if(index !== -1) {

      tickets[index] = updatedTicket;

      localStorage.setItem(this.storageKey, JSON.stringify(tickets));
    }
  }

  // DELETE TICKET
  deleteTicket(id: number): void {

    const tickets = this.getTickets();

    const filteredTickets = tickets.filter(
      ticket => ticket.id !== id
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(filteredTickets)
    );
  }
}
