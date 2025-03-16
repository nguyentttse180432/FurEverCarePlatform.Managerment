import React, { useEffect, useMemo } from 'react';
import { Form, Input, Switch, Select, Button, Space, InputNumber, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, ProductType, ProductPrice, ProductTypeDetail } from '../../../types/Product';

interface ProductFormProps {
  onSubmit: (values: Product) => void;
  initialValues?: Partial<Product>;
  categories: { id: string; name: string }[];
  brands: { id: string; name: string }[];
  stores: { id: string; name: string }[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  initialValues,
  categories,
  brands,
  stores,
}) => {
  const [form] = Form.useForm();

  // Watch for changes in productTypes
  const productTypes = Form.useWatch('productTypes', form);

  // Memoize price combinations to prevent unnecessary recalculations
  const priceCombinations = useMemo(() => {
    if (!productTypes || productTypes.length === 0) return [];

    const combinations: ProductPrice[] = [];
    
    // Get the first two product types (if they exist)
    const type1 = productTypes[0];
    const type2 = productTypes[1];

    if (!type1?.productTypeDetails?.length) return [];
    // If we only have one product type
    if (!type2?.productTypeDetails?.length) {
      return type1.productTypeDetails.map((detail1: ProductTypeDetail) => ({
        price: 0,
        inventory: 0,
        productTypeDetails1: detail1?.name,
        productTypeDetails2: '',
      }));
    } 

    // If we have two product types
    return type1.productTypeDetails.flatMap((detail1: ProductTypeDetail) =>
      type2.productTypeDetails.map((detail2: ProductTypeDetail) => ({
        price: 0,
        inventory: 0,
        productTypeDetails1: detail1?.name,
        productTypeDetails2: detail2?.name,
      }))
    );
  }, [productTypes]);

  // Update product prices when combinations change
  useEffect(() => {
    const currentPrices = form.getFieldValue('productPrices') || [];
    
    // Only update if the combinations are different
    if (JSON.stringify(currentPrices) !== JSON.stringify(priceCombinations)) {
      // Preserve existing prices and inventory when possible
      const newPrices = priceCombinations.map((combination: ProductPrice) => {
        const existingPrice = currentPrices.find(
          (price: ProductPrice) => 
            price.productTypeDetails1 === combination.productTypeDetails1 && 
            price.productTypeDetails2 === combination.productTypeDetails2
        );
        return existingPrice || combination;
      });

      form.setFieldValue('productPrices', newPrices);
    }
  }, [priceCombinations, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
      className="max-w-2xl mx-auto"
    >
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="productCode"
          label="Product Code"
          rules={[{ required: true, message: 'Please enter product code' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="productCategoryId"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select>
            {categories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="brandId"
          label="Brand"
          rules={[{ required: true, message: 'Please select a brand' }]}
        >
          <Select>
            {brands.map(brand => (
              <Select.Option key={brand.id} value={brand.id}>
                {brand.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="storeId"
          label="Store"
          rules={[{ required: true, message: 'Please select a store' }]}
        >
          <Select>
            {stores.map(store => (
              <Select.Option key={store.id} value={store.id}>
                {store.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked" label="Active Status">
          <Switch />
        </Form.Item>
      </div>

      {/* Product Types */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Types</h2>
        
        <Form.List name="productTypes">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} className="border p-4 mb-4 rounded">
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    label={`Type ${index + 1} Name`}
                    rules={[{ required: true, message: 'Missing type name' }]}
                  >
                    <Input placeholder="e.g., Size, Color" />
                  </Form.Item>

                  <Form.List name={[field.name, 'productTypeDetails']}>
                    {(subFields, { add: addDetail, remove: removeDetail }) => (
                      <>
                        {subFields.map((subField, subIndex) => (
                          <Space key={subField.key} align="baseline">
                            <Form.Item
                              {...subField}
                              name={[subField.name, 'name']}
                              rules={[{ required: true, message: 'Missing detail name' }]}
                            >
                              <Input placeholder={`Enter ${form.getFieldValue(['productTypes', index, 'name'])} option`} />
                            </Form.Item>
                            <Button 
                              type="text" 
                              danger 
                              icon={<MinusCircleOutlined />}
                              onClick={() => removeDetail(subIndex)}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => addDetail()} block>
                          <PlusOutlined /> Add Option
                        </Button>
                      </>
                    )}
                  </Form.List>

                  {fields.length > 1 && (
                    <Button type="link" danger onClick={() => remove(field.name)}>
                      Remove Type
                    </Button>
                  )}
                </div>
              ))}
              {fields.length < 2 && (
                <Button type="dashed" onClick={() => add()} block>
                  <PlusOutlined /> Add Product Type
                </Button>
              )}
            </>
          )}
        </Form.List>
      </div>

      {/* Product Prices */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Prices</h2>
        
        <Form.List name="productPrices">
          {(fields) => (
            <Table
              dataSource={fields.map(field => ({
                ...field,
                key: field.key,
                ...form.getFieldValue(['productPrices', field.name])
              }))}
              pagination={false}
              columns={[
                {
                  title: 'Type 1',
                  dataIndex: 'productTypeDetails1',
                  key: 'productTypeDetails1',
                },
                {
                  title: 'Type 2',
                  dataIndex: 'productTypeDetails2',
                  key: 'productTypeDetails2',
                },
                {
                  title: 'Price',
                  key: 'price',
                  render: (_, __, index) => (
                    <Form.Item
                      name={[index, 'price']}
                      rules={[{ required: true, message: 'Required' }]}
                      noStyle
                    >
                      <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        placeholder="Enter price"
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: 'Inventory',
                  key: 'inventory',
                  render: (_, __, index) => (
                    <Form.Item
                      name={[index, 'inventory']}
                      rules={[{ required: true, message: 'Required' }]}
                      noStyle
                    >
                      <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        placeholder="Enter inventory"
                      />
                    </Form.Item>
                  ),
                },
              ]}
            />
          )}
        </Form.List>
      </div>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
