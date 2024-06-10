export interface CreditCard {
  cartid: number;
  fullname: string;
  address: string;
  city: string;
  state: string;
  nameoncard: string;
  creditcardnum: string;
  expmonth: string;
  expyear: string;
  cvv: string;
}

export interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  cartId: number;
  productId: number;
}