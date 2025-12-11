import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private get token(): string | null {
    return sessionStorage.getItem('token');
  }

  private decode(): any | null {
    if (!this.token) return null;

    try {
      const payload = this.token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  get username(): string | null {
    return this.decode()?.sub ?? null;
  }

  get userId(): number | null {
    return this.decode()?.id ?? null;
  }

  get role(): string | null {
    return this.decode()?.role ?? null;
  }
  
  get isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  get isJoueur(): boolean {
    return this.role === 'JOUEUR';
  }

  get hasToken(): boolean {
  return !!this.token;
}
}