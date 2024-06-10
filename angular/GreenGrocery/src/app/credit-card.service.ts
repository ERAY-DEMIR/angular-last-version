import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Order, CreditCard } from './credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private orderBaseUrl = 'http://localhost:8080/api/order/create';
  private paymentBaseUrl = 'http://localhost:8080/api/payment/add';

  constructor(private http: HttpClient) { }

  createOrderAndSavePayment(paymentDetails: CreditCard): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const createOrderUrl = `${this.orderBaseUrl}?cartId=${encodeURIComponent(paymentDetails.cartid)}`;
    const createOrderRequest = this.http.post<Order>(createOrderUrl, paymentDetails, { headers });
    const savePaymentRequest = this.http.post<CreditCard>(this.paymentBaseUrl, paymentDetails, { headers });

    return forkJoin([createOrderRequest, savePaymentRequest]);
  }
}