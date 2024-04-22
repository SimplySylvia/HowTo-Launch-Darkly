export interface Product {
  _id: string;
  image: string;
  video: string;
  discount?: string;
  originalPrice?: string;
  finalPrice: string;
}

export type Products = Product[];