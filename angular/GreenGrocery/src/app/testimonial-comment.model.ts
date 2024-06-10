export interface TestimonialComment {
    customer: {
      customerId: number;
      username: string;
      email: string;
      password: string;
      address: string;
      phoneNumber: string;
    };
    rating: number; // Ensure rating is a number
    comments: string;
    dateOfPost: Date;
  }