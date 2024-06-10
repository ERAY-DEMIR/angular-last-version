import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private baseUrl = 'http://localhost:8080/api/password/forgot';

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<string> {
    return this.http.post<string>('http://localhost:8080/api/password/forgot', { email });
  }
}