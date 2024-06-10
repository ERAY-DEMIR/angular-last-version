import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: Cart): void {
    const maxQuantity = Math.min(item.product.stockQuantity, 10);
    if (item.quantity < maxQuantity) {
      item.quantity++;
      item.price = item.quantity * item.product.discountedPrice;
    }
  }

  decreaseQuantity(item: Cart): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.price = item.quantity * item.product.discountedPrice;
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
  }


  confirmCheckout(): void {
    this.cartService.checkout(this.cartItems).subscribe(() => {
      this.router.navigate(['/credit-card']);
    });
  }
}