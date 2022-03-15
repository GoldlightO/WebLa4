import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../entities/user";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = "http://localhost:8080";
  private USER_KEY: string = 'auth-user';
  private TOKEN_KEY: string = 'auth-token';

  constructor(private http: HttpClient) {
  }

  public logout(): void {
    window.sessionStorage.clear();
  }

  public addUser(username: string, token: string): void {
    window.sessionStorage.setItem(this.USER_KEY, username);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public getLogin(): string | null {
    return window.sessionStorage.getItem(this.USER_KEY);
  }

  public register(user: User): Observable<HttpResponse<any>> {
    return this.http.post(this.URL + "/register", user, {observe: 'response'})
  }

  public logIn(user: User): Observable<HttpResponse<any>> {
    return this.http.post<string>(this.URL + "/authenticate", user, {observe: 'response'});
  }
}
