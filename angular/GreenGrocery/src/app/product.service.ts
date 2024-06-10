import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product, Cart, Login } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/Products'; // Update this to your actual API URL
  private addCartUrl = 'http://localhost:8080/add'; // API endpoint for adding to cart
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    // Initial data load
    this.updateProducts();
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  private updateProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  addToCart(productId: number, customerId?: number): Observable<any> {
    const payload = { productId, customerId }; // Send productId and customerId as payload
    return this.http.post<any>(this.addCartUrl, payload);
  }
}