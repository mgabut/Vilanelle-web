import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthRequestDto } from '../dto/auth-request-dto';
import { AuthResponseDto } from '../dto/auth-response-dto';
import { SubscribeRequestDto } from '../dto/subscribe-request-dto';
import { SubscribeResponseDto } from '../dto/subscribe-response-dto';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string = "";

  constructor(private http: HttpClient) {
    this._token = sessionStorage.getItem("token") ?? "";
  }

  public get token(): string {
    return this._token;
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

          this._token = resp.token;

          sessionStorage.setItem("token", this._token);

          resolve();
        },

        // error => si la réponse est KO (30X, 40X, 50X)
        error: err => reject(err)
      });
    })
  }

  public register(subscribeRequest: SubscribeRequestDto): Promise<SubscribeResponseDto>{
    return new Promise((resolve, reject) => {
      this.http.post<SubscribeResponseDto>('/joueur', subscribeRequest.toJson()).subscribe({
        next: resp => resolve(resp),
        error: err => reject(err)
      });
    });

  }

  public isLogged() {
    return !!this._token;
  }

  public logout() {
    this._token = "";
    sessionStorage.removeItem("token");
  }
}
