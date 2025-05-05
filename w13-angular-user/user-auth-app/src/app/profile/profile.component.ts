import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  allUsers: any[] = [];
  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simulate loading delay
    setTimeout(() => {
      this.loadUserData();
    }, 500);
  }

  loadUserData() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
    
    this.isLoading = false;
  }

  logout() {
    this.isLoading = true;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
