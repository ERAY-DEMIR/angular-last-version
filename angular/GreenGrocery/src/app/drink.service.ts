import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './drink.model';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private apiUrl = 'http://localhost:8080/drinks'; // Update this to your actual Drinks API URL
  private addCartUrl = 'http://localhost:8080/add'; // API endpoint for adding to cart
  private drinksSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    // Initial data load
    this.updateDrinks();
  }

  getDrinks(): Observable<Product[]> {
    return this.drinksSubject.asObservable();
  }

  private updateDrinks() {
    this.http.get<Product[]>(this.apiUrl).subscribe(drinks => {
      this.drinksSubject.next(drinks);
    });
  }

  addToCart(productId: number, customerId?: number): Observable<any> {
    const payload = { productId, customerId }; // Send productId and customerId as payload
    return this.http.post<any>(this.addCartUrl, payload);
  }
}
