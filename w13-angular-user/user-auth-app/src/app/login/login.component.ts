import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            formControlName="username"
            [class.is-invalid]="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
          >
          <div class="error-message" *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
            <span *ngIf="loginForm.get('username')?.errors?.['required']">Username is required</span>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
          >
          <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
          </div>
        </div>

        <div class="error-message" *ngIf="loginError">
          {{ loginError }}
        </div>

        <button type="submit" [disabled]="loginForm.invalid || isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        <p>Don't have an account? <a routerLink="/register">Register here</a></p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 500px;
      margin: 40px auto;
      padding: 30px;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    input.is-invalid {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    p {
      text-align: center;
      margin-top: 20px;
      color: #666;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  loginError: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      // Simulate API delay
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => 
          u.username === this.loginForm.value.username && 
          u.password === this.loginForm.value.password
        );

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/profile']);
        } else {
          this.loginError = 'Invalid username or password. Please try again.';
        }
        this.isLoading = false;
      }, 500);
    }
  }
}
