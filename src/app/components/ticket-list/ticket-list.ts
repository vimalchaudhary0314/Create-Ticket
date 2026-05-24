import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../service/ticket-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnInit {

  tickets: Ticket[] = [];

  filteredTickets: Ticket[] = [];

  searchText = '';

  selectedPriority = '';

  selectedStatus = '';

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.loadTickets();
  }

  // LOAD ALL TICKETS
  loadTickets() {

    this.tickets =
      this.ticketService.getTickets();

    this.filteredTickets = this.tickets;
  }

  // DELETE TICKET
  deleteTicket(id: number) {

    const confirmDelete =
      confirm('Are you sure to delete ticket?');

    if(confirmDelete) {

      this.ticketService.deleteTicket(id);

      this.loadTickets();

      alert('Ticket Deleted Successfully');
    }
  }

  // SEARCH + FILTER
  filterTickets() {

    this.filteredTickets =
      this.tickets.filter(ticket => {

        const matchesSearch =
          ticket.title
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

        const matchesPriority =
          this.selectedPriority
            ? ticket.priority === this.selectedPriority
            : true;

        const matchesStatus =
          this.selectedStatus
            ? ticket.status === this.selectedStatus
            : true;

        return (
          matchesSearch &&
          matchesPriority &&
          matchesStatus
        );
      });
  }
}
