export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  whatsapp: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}
