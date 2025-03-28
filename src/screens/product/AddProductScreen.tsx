import React from 'react';
import { Card, message } from 'antd';
import { UseMutationResult } from '@tanstack/react-query';
import ProductForm from '../../components/features/product/ProductForm';
import { IAddProduct } from '../../types/IProduct';
import { useAddProduct } from '../../hooks/product/useAddProduct';

const AddProductScreen: React.FC = () => {
  const { mutate: addProduct, isPending } = useAddProduct();

  // const handleSubmit = async (values: IAddProduct) => {
  //   try {
  //     await addProduct(values);
  //     message.success('Product added successfully');
  //   } catch (error) {
  //     message.error('Failed to add product');
  //   }
  // };
  const categories = [
    { id: "8858B173-9D33-4D4A-B7E5-02A1E1AF53B3", name: "Food" },
    { id: "43715788-0B06-4ACE-92CB-2D1AF7A46B6F", name: "Toy" },
  ];

  const brands = [
    { id: "E9534604-C257-4CC5-9831-03C4E6B1C2FE", name: "PetCare" },
    { id: "9C9C5050-C1F5-4E39-A522-68825D380355", name: "AnimalPlanet" },
  ];

  const stores = [
    { id: "9AAA435C-72F4-4885-B701-42B6DE5FCBD6", name: "Pet World" },
    { id: "403CC569-69B3-4CC8-9E07-754506E6EF56", name: "Animal Care Center" },
  ];
  return (
    <div className="p-6">
      <Card title="Add New Product" loading={isPending}>
        <ProductForm
          onSubmit={addProduct}
          categories={categories} 
          brands={brands} 
          stores={stores} 
        />
      </Card>
    </div>
  );
};

export default AddProductScreen;
