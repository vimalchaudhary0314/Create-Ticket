export interface UserRegistration {

  name: string;

  phoneNo: string;

  email: string;

  password: string;

  confirmPassword: string;
}

export interface Ticket {

  id: number;

  title: string;

  description: string;

  priority: string;

  status: string;

  assignedEmployee: string;

  createdDate: string;
}
