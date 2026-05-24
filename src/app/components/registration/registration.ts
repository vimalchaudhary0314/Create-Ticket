import { Component } from '@angular/core';

import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';

import { RouterLink } from '@angular/router';
import { UserRegistration } from '../../models/ticket';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})

export class Registration {

  form = new FormGroup({

    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    phoneNo: new FormControl('', [
      Validators.required
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),

    confirmPassword: new FormControl('', [
      Validators.required
    ])

  });

  onSubmit() {

    if (this.form.valid) {

      const userData: UserRegistration =
        this.form.value as UserRegistration;

      console.log(userData);

      // Save in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify(userData)
      );

      alert('Registration Successful');

      this.form.reset();

    } else {

      alert('Please fill all fields');

    }
  }
}