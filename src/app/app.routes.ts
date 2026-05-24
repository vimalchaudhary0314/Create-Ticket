import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { NotFoundPage } from './components/not-found-page/not-found-page';
import { CreateTicket } from './components/create-ticket/create-ticket';
import { Header } from './components/header/header';
import { TicketList } from './components/ticket-list/ticket-list';

export const routes: Routes = [
    {path:"",component:Registration},
    {path:"login",component:Login},
    {path:"header",component:Header},
    {path:"create-ticket",component:CreateTicket},
    {path: 'create-ticket/:id',component: CreateTicket},
    {path:"dashboard",component:Dashboard},
    {path:"ticketList",component:TicketList},
    {path:"**",component:NotFoundPage}
];
