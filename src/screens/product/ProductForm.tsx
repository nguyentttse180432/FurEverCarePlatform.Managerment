import React from 'react';
import { Form, Input, Switch, Select, Button, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product } from '../../types/Product';

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
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 mb-4 rounded">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    label="Type Name"
                    rules={[{ required: true, message: 'Missing type name' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.List name={[name, 'productTypeDetails']}>
                    {(subFields, { add: addDetail, remove: removeDetail }) => (
                      <>
                        {subFields.map((subField, index) => (
                          <Space key={subField.key} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[subField.name, 'name']}
                              rules={[{ required: true, message: 'Missing detail name' }]}
                            >
                              <Input placeholder="Detail name" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => removeDetail(index)} />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => addDetail()} block>
                          <PlusOutlined /> Add Detail
                        </Button>
                      </>
                    )}
                  </Form.List>
                  <Button type="link" danger onClick={() => remove(name)}>
                    Remove Type
                  </Button>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                <PlusOutlined /> Add Product Type
              </Button>
            </>
          )}
        </Form.List>
      </div>

      {/* Product Prices */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Prices</h2>
        
        <Form.List name="productPrices">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 mb-4 rounded">
                  <Space align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      label="Price"
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'inventory']}
                      label="Inventory"
                      rules={[{ required: true, message: 'Missing inventory' }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'productTypeDetails1']}
                      label="Type Detail 1"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'productTypeDetails2']}
                      label="Type Detail 2"
                    >
                      <Input />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                <PlusOutlined /> Add Price Configuration
              </Button>
            </>
          )}
        </Form.List>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
