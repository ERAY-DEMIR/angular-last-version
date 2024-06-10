import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Cart, Product } from './cart.model';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    const product: Product = { 
      productId: 1, 
      productName: 'Product 1', 
      description: '', 
      image: '', 
      discountedPrice: 8, 
      stockQuantity: 10 
    };
    const cartItem: Cart = { product, quantity: 1, price: 8 };

    service.addToCart(product.productId).subscribe(response => {
      expect(response).toEqual(cartItem);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/add`);
    expect(req.request.method).toBe('POST');
    req.flush(cartItem);
  });

  it('should remove item from cart', () => {
    const productId = 1;
    const responseMessage = { message: 'Item removed successfully' };

    service.removeFromCart(productId).subscribe(response => {
      expect(response).toEqual(responseMessage);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/remove?productId=${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(responseMessage);
  });

  it('should update cart item quantity', () => {
    const product: Product = { 
      productId: 1, 
      productName: 'Product 1', 
      description: '', 
      image: '', 
      discountedPrice: 8, 
      stockQuantity: 10 
    };
    const newQuantity = 2;
    const cartItem: Cart = { product, quantity: newQuantity, price: newQuantity * product.discountedPrice };

    service.updateQuantity(product, newQuantity).subscribe(response => {
      expect(response).toEqual(cartItem);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/updateQuantity`);
    expect(req.request.method).toBe('PUT');
    req.flush(cartItem);
  });

  it('should get cart items', () => {
    const cartItems: Cart[] = [
      { product: { productId: 1, productName: 'Product 1', description: '', image: '', discountedPrice: 8, stockQuantity: 10 }, quantity: 1, price: 8 },
      { product: { productId: 2, productName: 'Product 2', description: '', image: '', discountedPrice: 16, stockQuantity: 5 }, quantity: 2, price: 32 }
    ];

    service.getCartItems().subscribe(response => {
      expect(response).toEqual(cartItems);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(cartItems);
  });
});