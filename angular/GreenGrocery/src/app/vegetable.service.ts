import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './vegetable.model';

@Injectable({
  providedIn: 'root'
})
export class VegetableService {
  private apiUrl = 'http://localhost:8080/vegetables'; // Update this to your actual Vegetables API URL
  private addCartUrl = 'http://localhost:8080/add'; // API endpoint for adding to cart
  private vegetablesSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    // Initial data load
    this.updateVegetables();
  }

  getVegetables(): Observable<Product[]> {
    return this.vegetablesSubject.asObservable();
  }

  private updateVegetables() {
    this.http.get<Product[]>(this.apiUrl).subscribe(vegetables => {
      this.vegetablesSubject.next(vegetables);
    });
  }

  addToCart(productId: number, customerId?: number): Observable<any> {
    const payload = { productId, customerId }; // Send productId and customerId as payload
    return this.http.post<any>(this.addCartUrl, payload);
  }
}
