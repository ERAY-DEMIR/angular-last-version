import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}