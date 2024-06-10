export interface Product {
  productId: number;
  productName: string;
  description: string;
  image: string;
  discountedPrice: number;
  stockQuantity: number; // Added stockQuantity to Product interface
}

export interface Login {
  id: number | null;
  // Add other fields as needed
}

export interface Cart {
  cartId?: number; // Optional because it might be assigned by the backend
  customer?: Login | null; // Can be null
  product: Product;
  quantity: number;
  price: number;
}

export interface Payment {
  id?: number; // Optional because it might be assigned by the backend
  totalPrice: number;
}
  