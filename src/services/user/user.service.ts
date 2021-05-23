import { Login } from './../../models/login.model';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/login`, login)
      .pipe(
        catchError((error) => {
          return error
        }),
      )
  }
  signup(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/signup`, user).pipe(
      catchError((error) => {
        return error
      }),
    )
  }
}
