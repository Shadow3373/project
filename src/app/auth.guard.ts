import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Optional: Validate JWT expiration
    const isTokenExpired = this.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.removeItem('token'); // Clear expired token
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  // Decode token and check expiration
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      return true; // Invalid token format
    }
  }
}
