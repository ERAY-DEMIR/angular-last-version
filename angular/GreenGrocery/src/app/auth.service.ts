import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private username: string | null = null;

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response) {
          this.isAuthenticatedSubject.next(true);
          this.username = username;
          this.setLocalStorageItem('username', username);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, { username: this.username }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.username = null;
        this.removeLocalStorageItem('username');
      })
    );
  }

  getUsername(): string | null {
    return this.username;
  }

  setAuthenticated(isAuthenticated: boolean, username: string | null) {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.username = username;
    if (isAuthenticated && username) {
      this.setLocalStorageItem('username', username);
    } else {
      this.removeLocalStorageItem('username');
    }
  }

  checkLoginStatus(): void {
    const storedUsername = this.getLocalStorageItem('username');
    if (storedUsername) {
      this.username = storedUsername;
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  private getLocalStorageItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}