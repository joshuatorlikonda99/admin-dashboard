import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const API_URL = 'http://localhost:5000/api';

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserRow[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /** Load all users */
  loadUsers() {
    this.loading = true;

    this.http.get<UserRow[]>(`${API_URL}/admin/users`).subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load users';
        this.loading = false;
        this.showError('Unable to fetch users from server');
      },
    });
  }

  /** Toggle user active/inactive */
  toggleActive(user: UserRow) {
    const endpoint = `${API_URL}/admin/users/${user._id}/toggle`;

    this.http.patch<{ isActive: boolean }>(endpoint, {}).subscribe({
      next: (res) => {
        user.isActive = res.isActive;

        this.showSuccess(
          `User is now ${res.isActive ? 'Active' : 'Inactive'}`
        );
      },
      error: () => {
        this.showError('Failed to update user');
      },
    });
  }

  /** Snackbar Success */
  private showSuccess(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2500,
      panelClass: ['snackbar-success'],
    });
  }

  /** Snackbar Error */
  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  }
}
