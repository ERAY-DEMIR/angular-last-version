export interface Product {
  id: number;
  productName: string;
  description: string;
  image: string;
  discountedPrice: number;
}

export interface Login {
  id?: number | null; // ID can be nullable
  // Add other fields as needed
}

export interface Cart {
  id?: number; // Optional because it might be assigned by the backend
  customer: Login | null; // Allow customer to be null
  product: Product;
  quantity: number;
  price: number;
}