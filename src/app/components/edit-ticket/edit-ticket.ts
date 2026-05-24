import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-edit-ticket',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './edit-ticket.html',
  styleUrl: './edit-ticket.css',
})
export class EditTicket {}
