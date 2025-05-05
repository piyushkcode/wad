import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <h1>Welcome to User Auth App</h1>
      <div class="options-container">
        <a routerLink="/register" class="option-card">
          <h2>Register</h2>
          <p>Create a new account</p>
        </a>
        <a routerLink="/login" class="option-card">
          <h2>Login</h2>
          <p>Sign in to your account</p>
        </a>
        <a routerLink="/profile" class="option-card" *ngIf="isLoggedIn">
          <h2>Profile</h2>
          <p>View your profile</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 40px auto;
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #333;
      margin-bottom: 40px;
    }

    .options-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .option-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 30px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .option-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .option-card h2 {
      color: #007bff;
      margin-bottom: 10px;
    }

    .option-card p {
      color: #666;
      margin: 0;
    }
  `]
})
export class HomeComponent {
  isLoggedIn: boolean = false;

  constructor() {
    this.isLoggedIn = !!localStorage.getItem('currentUser');
  }
}
