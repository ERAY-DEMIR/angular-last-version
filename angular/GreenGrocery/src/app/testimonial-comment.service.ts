import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialCommentService {
  private baseUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) {}

  addTestimonial(testimonial: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, testimonial);
  }

  getTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
