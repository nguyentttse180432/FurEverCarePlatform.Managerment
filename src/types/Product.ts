export interface ProductTypeDetail {
  name: string;
}

export interface ProductType {
  name: string;
  productTypeDetails: ProductTypeDetail[];
}

export interface ProductPrice {
  price: number;
  inventory: number;
  productTypeDetails1: string;
  productTypeDetails2: string;
}

export interface Product {
  productCategoryId: string;
  name: string;
  isActive: boolean;
  productCode: string;
  views: number;
  brandId: string;
  storeId: string;
  productTypes: ProductType[];
  productPrices: ProductPrice[];
}
