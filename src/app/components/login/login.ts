import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {
  constructor(private router: Router) {}

  form = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])

  });

  onSubmit() {

    if (this.form.valid) {

      // Get saved registration data
      const savedData = localStorage.getItem('user');

      if (savedData) {

        const user = JSON.parse(savedData);

        // Check email and password
        if (
          user.email === this.form.value.email &&
          user.password === this.form.value.password
        ) {

          alert('Login Successful');
          // Navigate header
      this.router.navigate(['header']);


        } else {

          alert('Invalid Email or Password');

        }

      } else {

        alert('No Registered User Found');

      }

    } else {

      alert('Please fill all fields');

    }
  }
}