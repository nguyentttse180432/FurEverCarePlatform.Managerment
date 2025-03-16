import { AxiosResponse } from 'axios';
import { client } from './clients';
import { Product } from '../types/Product';

const BASE_URL = 'http://localhost:5225/api/v1/product';

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await client.get(BASE_URL);
  return response.data;
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response: AxiosResponse<Product> = await client.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  const response: AxiosResponse<Product> = await client.post(BASE_URL, product);
  return response.data;
};

// Update a product
export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  const response: AxiosResponse<Product> = await client.put(`${BASE_URL}/${id}`, product);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  await client.delete(`${BASE_URL}/${id}`);
};

// Update product status (active/inactive)
export const updateProductStatus = async (id: string, isActive: boolean): Promise<Product> => {
  const response: AxiosResponse<Product> = await client.patch(`${BASE_URL}/${id}/status`, { isActive });
  return response.data;
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await client.get(`${BASE_URL}/category/${categoryId}`);
  return response.data;
};

// Get products by store
export const getProductsByStore = async (storeId: string): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await client.get(`${BASE_URL}/store/${storeId}`);
  return response.data;
};

// Get products by brand
export const getProductsByBrand = async (brandId: string): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await client.get(`${BASE_URL}/brand/${brandId}`);
  return response.data;
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await client.get(`${BASE_URL}/search`, {
    params: { q: query }
  });
  return response.data;
};

// Update product inventory
export const updateProductInventory = async (
  productId: string, 
  priceId: string, 
  inventory: number
): Promise<Product> => {
  const response: AxiosResponse<Product> = await client.patch(
    `${BASE_URL}/${productId}/prices/${priceId}/inventory`,
    { inventory }
  );
  return response.data;
};

// Update product price
export const updateProductPrice = async (
  productId: string,
  priceId: string,
  price: number
): Promise<Product> => {
  const response: AxiosResponse<Product> = await client.patch(
    `${BASE_URL}/${productId}/prices/${priceId}/price`,
    { price }
  );
  return response.data;
};

// Get product statistics
export const getProductStats = async (productId: string): Promise<{
  totalViews: number;
  totalSales: number;
  averageRating: number;
}> => {
  const response: AxiosResponse<{
    totalViews: number;
    totalSales: number;
    averageRating: number;
  }> = await client.get(`${BASE_URL}/${productId}/stats`);
  return response.data;
};

// Bulk update products
export const bulkUpdateProducts = async (products: Product[]): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await client.put(`${BASE_URL}/bulk`, products);
  return response.data;
};

// Export products
export const exportProducts = async (format: 'csv' | 'excel'): Promise<Blob> => {
  const response: AxiosResponse<Blob> = await client.get(`${BASE_URL}/export`, {
    params: { format },
    responseType: 'blob'
  });
  return response.data;
};

// Import products
export const importProducts = async (file: File): Promise<{
  success: boolean;
  importedCount: number;
  errors?: string[];
}> => {
  const formData = new FormData();
  formData.append('file', file);

  const response: AxiosResponse<{
    success: boolean;
    importedCount: number;
    errors?: string[];
  }> = await client.post(`${BASE_URL}/import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Error handling helper
export const handleProductError = (error: any): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 400:
        return 'Invalid product data provided';
      case 401:
        return 'Unauthorized access to product data';
      case 403:
        return 'Forbidden access to product data';
      case 404:
        return 'Product not found';
      case 409:
        return 'Product already exists';
      default:
        return 'An error occurred while processing your request';
    }
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response received from server';
  } else {
    // Something happened in setting up the request
    return 'Error setting up the request';
  }
};

export type { Product };
