import React from 'react';
import { Card, message } from 'antd';
import { UseMutationResult } from '@tanstack/react-query';
import ProductForm from '../../components/features/product/ProductForm';
import { IAddProduct } from '../../types/IProduct';
import { useAddProduct } from '../../hooks/product/useAddProduct';

const AddProductScreen: React.FC = () => {
  const { mutate: addProduct, isPending } = useAddProduct();

  const handleSubmit = async (values: IAddProduct) => {
    try {
      await addProduct(values);
      message.success('Product added successfully');
    } catch (error) {
      message.error('Failed to add product');
    }
  };
  const categories = [
    { id: "E9ED58DF-EFF3-449C-BE72-08DD5F6FD641", name: "Category 1" },
    { id: "A6281BBB-22C0-4667-C1C4-08DD636ECAA0", name: "Toy" },
  ];

  const brands = [
    { id: "159141F3-96DA-4051-820E-11FAE16AC3FE", name: "PetCare" },
    { id: "F45FC4F5-D85F-47B9-AB0B-1BA984388093", name: "AnimalPlanet" },
  ];

  const stores = [
    { id: "BA270842-CA21-4EED-AB5B-3493DED3BC27", name: "Pet World" },
    { id: "80947517-4F05-4866-B409-6CCBEE5ECEE0", name: "Animal Care Center" },
  ];
  return (
    <div className="p-6">
      <Card title="Add New Product" loading={isPending}>
        <ProductForm
          onSubmit={handleSubmit}
          categories={categories} 
          brands={brands} 
          stores={stores} 
        />
      </Card>
    </div>
  );
};

export default AddProductScreen;
