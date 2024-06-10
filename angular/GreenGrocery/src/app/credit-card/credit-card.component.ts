import { Component } from '@angular/core';
import { CreditCardService } from '../credit-card.service';
import { CreditCard } from '../credit-card.model';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  paymentDetails: CreditCard = {
    fullname: '',
    address: '',
    city: '',
    state: '',
    nameoncard: '',
    creditcardnum: '',
    expmonth: '',
    expyear: '',
    cvv: '',
    cartid: 23 // Set a default or retrieved cartId here
  };

  constructor(private creditCardService: CreditCardService) { }
  ngOnInit(): void {}
  createOrderAndSavePayment() {
    if (!this.isValidCreditCardDetails(this.paymentDetails)) {
      alert('Invalid credit card details. Please check and try again.');
      return;
    }
    this.paymentDetails.cartid += 1;
    this.creditCardService.createOrderAndSavePayment(this.paymentDetails).subscribe(
      ([orderResult, paymentResult]) => {
        console.log('Order Result:', orderResult);
        console.log('Payment Result:', paymentResult);
        alert('Order and payment processed successfully.');
      },
      error => {
        alert('Payment information is saved');
      }
    );
  }
  isValidCreditCardDetails(details: CreditCard): boolean {
    const cvvPattern = /^\d{3}$/;
    const expMonthPattern = /^\d{2}$/;
    const expYearPattern = /^\d{4}$/;
    const creditCardPattern = /^\d{16}$/;

    return cvvPattern.test(details.cvv) &&
           expMonthPattern.test(details.expmonth) &&
           expYearPattern.test(details.expyear) &&
           creditCardPattern.test(details.creditcardnum);
  }

  restrictNumeric(event: KeyboardEvent) {
    const input = event.key;
    if (!/^\d$/.test(input) && input !== 'Backspace' && input !== 'Delete' && input !== 'ArrowLeft' && input !== 'ArrowRight') {
      event.preventDefault();
    }
  }
}