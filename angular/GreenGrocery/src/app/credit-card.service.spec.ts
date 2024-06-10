import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreditCardService } from './credit-card.service';
import { CreditCard, Order } from './credit-card.model';

describe('CreditCardService', () => {
  let service: CreditCardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreditCardService]
    });
    service = TestBed.inject(CreditCardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an order and save payment', (done: DoneFn) => {
    const mockCreditCard: CreditCard = {
      fullname: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      nameoncard: 'John Doe',
      creditcardnum: '1234567890123456',
      expmonth: '12',
      expyear: '2024',
      cvv: '123',
      cartid: 23 // Set a default cartId
    };

    const mockOrder: Order = {
      orderDate: '2024-05-31T00:00:00.000Z',
      totalAmount: 100,
      orderStatus: 'preparing',
      cartId: 23,
      orderId: 0,
      productId: 0
    };

    service.createOrderAndSavePayment(mockCreditCard).subscribe(([orderResult, paymentResult]) => {
      expect(orderResult).toEqual(mockOrder);
      expect(paymentResult).toEqual(mockCreditCard);
      done();
    });

    const orderRequest = httpMock.expectOne(`http://localhost:8080/api/order/create?cartId=${mockCreditCard.cartid}`);
    expect(orderRequest.request.method).toBe('POST');
    orderRequest.flush(mockOrder);

    const paymentRequest = httpMock.expectOne('http://localhost:8080/api/payment/add');
    expect(paymentRequest.request.method).toBe('POST');
    paymentRequest.flush(mockCreditCard);
  });
});
