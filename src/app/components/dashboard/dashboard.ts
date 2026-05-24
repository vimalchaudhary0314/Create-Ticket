import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../service/ticket-service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  totalTickets = 0;
  openTickets = 0;
  closedTickets = 0;
  pendingTickets=0; 

  selectedLabel = 'All Tickets';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {

    this.tickets = this.ticketService.getTickets();

    this.filteredTickets = this.tickets;

    this.totalTickets = this.tickets.length;

    this.openTickets = this.tickets.filter(t => t.status === 'Open').length;

    this.closedTickets = this.tickets.filter(t => t.status === 'Closed').length;

    this.pendingTickets = this.tickets.filter(t => t.status === 'In Progress').length;
  }

  showAll() {
    this.filteredTickets = this.tickets;
    this.selectedLabel = 'All Tickets';
  }

  filterByStatus(status: string) {
    this.filteredTickets =
      this.tickets.filter(t => t.status === status);

    this.selectedLabel =
      `${status} Tickets : ${this.filteredTickets.length}`;
  }
}