import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [MatFormFieldModule,FormsModule],

})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  async login() {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username: this.username,
        password: this.password
      });
      localStorage.setItem('token', response.data.token);
      this.router.navigate(['/contacts']);
    } catch (error) {
      alert('Invalid credentials');
    }
  }
}
