import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterUser, User} from "../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null

  constructor(private http: HttpClient) {
  }

  register(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  getUser(): Observable<{id: string, name: string}> {
    return this.http.get<{id: string, name: string}>('/api/auth/user')
  }

  activeIn(user: string) {
    localStorage.setItem('user', user)
  }

  localGet() {
    const raw = localStorage.getItem('user')
    const user = JSON.parse(raw)
    return user.id
  }

  localGetName() {
    const raw = localStorage.getItem('user')
    const user = JSON.parse(raw)
    return user.name
  }
}
