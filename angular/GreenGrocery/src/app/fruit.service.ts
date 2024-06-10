import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './fruit.model';

@Injectable({
  providedIn: 'root'
})
export class FruitService {
  private apiUrl = 'http://localhost:8080/fruits'; // Update this to your actual Fruits API URL
  private addCartUrl = 'http://localhost:8080/add'; // API endpoint for adding to cart
  private fruitsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    // Initial data load
    this.updateFruits();
  }

  getFruits(): Observable<Product[]> {
    return this.fruitsSubject.asObservable();
  }

  private updateFruits() {
    this.http.get<Product[]>(this.apiUrl).subscribe(fruits => {
      this.fruitsSubject.next(fruits);
    });
  }

  addToCart(productId: number, customerId?: number): Observable<any> {
    const payload = { productId, customerId }; // Send productId and customerId as payload
    return this.http.post<any>(this.addCartUrl, payload);
  }
}
