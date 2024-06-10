import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  addToCart(productId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, { productId }).pipe(
      tap(() => this.loadCartItems())
    );
  }

  removeFromCart(productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId.toString());
    return this.http.delete<void>(`${this.apiUrl}/remove`, { params }).pipe(
      tap(() => this.loadCartItems())
    );
  }

  updateCartItem(productId: number, newQuantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateQuantity`, { productId, newQuantity }).pipe(
      tap(() => this.loadCartItems())
    );
  }

  checkout(cartItems: Cart[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, cartItems).pipe(
      tap(() => this.loadCartItems())
    );
  }

  private loadCartItems() {
    this.getCartItems().subscribe();
  }
}