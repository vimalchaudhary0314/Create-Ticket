import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TicketService } from '../../service/ticket-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket implements OnInit {

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // EDIT MODE FLAG
  isEditMode = false;
  ticketId!: number;

  // FORM
  ticketForm = new FormGroup({

    id: new FormControl<number>(Date.now(), {
      nonNullable: true
    }),

    title: new FormControl('', [
      Validators.required
    ]),

    description: new FormControl('', [
      Validators.required
    ]),

    priority: new FormControl('', [
      Validators.required
    ]),

    status: new FormControl('Open', [
      Validators.required
    ]),

    assignedEmployee: new FormControl('', [
      Validators.required
    ]),

    createdDate: new FormControl(
      new Date().toLocaleDateString()
    )
  });

  // INIT EDIT MODE CHECK
  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.isEditMode = true;
      this.ticketId = id;

      const ticket =
        this.ticketService
          .getTickets()
          .find(t => t.id === id);

      if (ticket) {

        this.ticketForm.patchValue({

          id: ticket.id,
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          status: ticket.status,
          assignedEmployee: ticket.assignedEmployee,
          createdDate: ticket.createdDate
        });
      }
    }
  }

  // CREATE / UPDATE METHOD
  createTicket() {

    if (this.ticketForm.valid) {

      const ticket: Ticket = {

        id: this.ticketForm.value.id!,
        title: this.ticketForm.value.title!,
        description: this.ticketForm.value.description!,
        priority: this.ticketForm.value.priority!,
        status: this.ticketForm.value.status!,
        assignedEmployee: this.ticketForm.value.assignedEmployee!,
        createdDate: this.ticketForm.value.createdDate!
      };


      // UPDATE MODE
      if (this.isEditMode) {

        this.ticketService.updateTicket(ticket);

        alert('Ticket Updated Successfully');
      }

      // CREATE MODE

      else {

        this.ticketService.createTicket(ticket);

        alert('Ticket Created Successfully');
      }

      // RESET FORM
      this.ticketForm.reset({

        id: Date.now(),
        status: 'Open',
        createdDate: new Date().toLocaleDateString()
      });

      // NAVIGATE
      this.router.navigate(['ticketList']);

    } else {

      alert('Please Fill All Fields');
    }
  }
}