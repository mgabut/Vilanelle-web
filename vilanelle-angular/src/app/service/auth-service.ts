import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthRequestDto } from '../dto/auth-request-dto';
import { AuthResponseDto } from '../dto/auth-response-dto';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string = "";
  private _role: 'ADMIN' | 'USER' | null = null;


  constructor(private http: HttpClient) {
    const storedToken = sessionStorage.getItem("token") ?? "";
    if (storedToken) {
      this.setToken(storedToken);
    }
  }

  private setToken(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);

    // 🔥 décodage JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    this._role = payload.role;
  }

  //getters - setters

  public get token(): string {
    return this._token;
  }

  public get role(): string | null {
    return this._role;
  }

  public isLogged(): boolean {
    return !!this._token;
  }

  public isAdmin(): boolean {
    return this._role === 'ADMIN';
  }

  public isUser(): boolean {
    return this._role === 'USER';
  }

  public auth(authRequest: AuthRequestDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<AuthResponseDto>('/auth', authRequest.toJson()).subscribe({
        // next => si la réponse est OK
        next: resp => {
          if (resp.success == false) {
            reject();
            return;
          }

          this.setToken(resp.token);
          resolve();

          resolve();
        },

        // error => si la réponse est KO (30X, 40X, 50X)
        error: err => reject(err)
      });
    })
  }

  public logout() {
    this._token = "";
    this._role = null;
    sessionStorage.removeItem("token");
  }

}
