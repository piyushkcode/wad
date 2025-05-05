import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordStrength: string = '';
  passwordStrengthColor: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });

    // Subscribe to password changes to check strength
    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
  }

  checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordStrength = '';
      this.passwordStrengthColor = '';
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough]
      .filter(Boolean).length;

    switch (strength) {
      case 0:
      case 1:
        this.passwordStrength = 'Very Weak';
        this.passwordStrengthColor = 'red';
        break;
      case 2:
        this.passwordStrength = 'Weak';
        this.passwordStrengthColor = 'orange';
        break;
      case 3:
        this.passwordStrength = 'Medium';
        this.passwordStrengthColor = 'yellow';
        break;
      case 4:
        this.passwordStrength = 'Strong';
        this.passwordStrengthColor = 'lightgreen';
        break;
      case 5:
        this.passwordStrength = 'Very Strong';
        this.passwordStrengthColor = 'green';
        break;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => 
        u.username === this.registerForm.value.username || 
        u.email === this.registerForm.value.email
      );

      if (userExists) {
        alert('Username or email already exists. Please choose another.');
        return;
      }

      users.push(this.registerForm.value);
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/login']);
    }
  }
}
