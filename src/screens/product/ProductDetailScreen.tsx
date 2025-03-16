import React from "react";

interface ProductTypeDetail {
    name: string;
}

interface ProductType {
    name: string;
    productTypeDetails: ProductTypeDetail[];
}

interface ProductPrice {
    price: number;
    inventory: number;
    productTypeDetails1: string;
    productTypeDetails2: string;
}

interface ProductDetail {
    id: string;
    name: string;
    productCode: string;
    brandName: string;
    storeName: string;
    categoryName: string;
    productTypes: ProductType[];
    productPrices: ProductPrice[];
}

const productDetail: ProductDetail = {
    id: "c388a266-c465-4ca0-1566-08dd6374dc34",
    name: "hạt cho mèo",
    productCode: "21233",
    brandName: "PetCare",
    storeName: "Pet World",
    categoryName: "toy",
    productTypes: [
        {
            name: "Loại",
            productTypeDetails: [
                { name: "10kg" },
                { name: "12kg" },
            ],
        },
        {
            name: "Màu sắc",
            productTypeDetails: [
                { name: "Màu đỏ" },
                { name: "Màu xanh" },
            ],
        },
    ],
    productPrices: [
        {
            price: 120000,
            inventory: 10,
            productTypeDetails1: "10kg",
            productTypeDetails2: "Màu đỏ",
        },
    ],
};

const ProductDetailScreen = () => {
    return (
        <div>
            <h1>{productDetail.name}</h1>
            <p>Product Code: {productDetail.productCode}</p>
            <p>Brand Name: {productDetail.brandName}</p>
            <p>Store Name: {productDetail.storeName}</p>
            <p>Category Name: {productDetail.categoryName}</p>
            <h2>Product Types</h2>
            {productDetail.productTypes.map((type) => (
                <div key={type.name}>
                    <h3>{type.name}</h3>
                    <ul>
                        {type.productTypeDetails.map((detail) => (
                            <li key={detail.name}>{detail.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <h2>Product Prices</h2>
            {productDetail.productPrices.map((price, index) => (
                <div key={index}>
                    <p>Price: {price.price}</p>
                    <p>Inventory: {price.inventory}</p>
                    <p>Type 1: {price.productTypeDetails1}</p>
                    <p>Type 2: {price.productTypeDetails2}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductDetailScreen;
