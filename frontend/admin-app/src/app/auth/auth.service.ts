import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';

const API_URL = 'http://localhost:5000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: any = null;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platform: Object
  ) {
    this.isBrowser = isPlatformBrowser(platform);

    if (this.isBrowser) {
      const stored = localStorage.getItem('user');
      if (stored) this._user = JSON.parse(stored);
    }
  }

  get currentUser() {
    return this._user;
  }

  isLoggedIn() {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return this._user?.role === 'admin';
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: any }>(`${API_URL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (this.isBrowser) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
          this._user = res.user;
        })
      );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this._user = null;
  }
}
