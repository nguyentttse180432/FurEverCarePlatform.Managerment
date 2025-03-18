import React, { useEffect, useMemo } from "react";
import {
  Form,
  Input,
  Switch,
  Select,
  Button,
  Space,
  InputNumber,
  Table,
  Card,
  Typography,
  Row,
  Col,
  Badge,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DollarOutlined,
  TagOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import {
  IAddProduct,
  ProductPrice,
  ProductTypeDetail,
} from "../../../types/IProduct";

const { Title, Text } = Typography;

interface ProductFormProps {
  onSubmit: (values: IAddProduct) => void;
  initialValues?: Partial<IAddProduct>;
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

  const productTypes = Form.useWatch("productTypes", form);

  const priceCombinations = useMemo(() => {
    if (!productTypes || productTypes.length === 0) return [];

    // const combinations: ProductPrice[] = [];

    const type1 = productTypes[0];
    const type2 = productTypes[1];

    if (!type1?.productTypeDetails?.length) return [];
    if (!type2?.productTypeDetails?.length) {
      return type1.productTypeDetails.map((detail1: ProductTypeDetail) => ({
        price: 0,
        inventory: 0,
        productTypeDetails1: detail1?.name,
        productTypeDetails2: "",
      }));
    }

    return type1.productTypeDetails.flatMap((detail1: ProductTypeDetail) =>
      type2.productTypeDetails.map((detail2: ProductTypeDetail) => ({
        price: 0,
        inventory: 0,
        productTypeDetails1: detail1?.name,
        productTypeDetails2: detail2?.name,
      }))
    );
  }, [productTypes]);

  useEffect(() => {
    const currentPrices = form.getFieldValue("productPrices") || [];

    if (JSON.stringify(currentPrices) !== JSON.stringify(priceCombinations)) {
      const newPrices = priceCombinations.map((combination: ProductPrice) => {
        const existingPrice = currentPrices.find(
          (price: ProductPrice) =>
            price.productTypeDetails1 === combination.productTypeDetails1 &&
            price.productTypeDetails2 === combination.productTypeDetails2
        );
        return existingPrice || combination;
      });

      form.setFieldValue("productPrices", newPrices);
    }
  }, [priceCombinations, form]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
        className="space-y-6"
      >
        <Card
          className="shadow-md hover:shadow-lg transition-shadow"
          title={
            <Space>
              <TagOutlined className="text-blue-500" />
              <Title level={4} style={{ margin: 0 }}>
                Basic Information
              </Title>
            </Space>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
              >
                <Input
                  placeholder="Enter product name"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="productCode"
                label="Product Code"
                rules={[
                  { required: true, message: "Please enter product code" },
                ]}
              >
                <Input
                  prefix={<BarcodeOutlined className="text-gray-400" />}
                  placeholder="Enter product code"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="productCategoryId"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select category"
                  className="rounded-lg"
                >
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="brandId"
                label="Brand"
                rules={[{ required: true, message: "Please select a brand" }]}
              >
                <Select
                  size="large"
                  placeholder="Select brand"
                  className="rounded-lg"
                >
                  {brands.map((brand) => (
                    <Select.Option key={brand.id} value={brand.id}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="storeId"
                label="Store"
                rules={[{ required: true, message: "Please select a store" }]}
              >
                <Select
                  size="large"
                  placeholder="Select store"
                  className="rounded-lg"
                >
                  {stores.map((store) => (
                    <Select.Option key={store.id} value={store.id}>
                      {store.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="isActive"
            valuePropName="checked"
            label="Product Status"
          >
            <Space>
              <Switch />
              <Text type="secondary">
                Active product will be visible to customers
              </Text>
            </Space>
          </Form.Item>
        </Card>

        <Card
          className="shadow-md hover:shadow-lg transition-shadow"
          title={
            <Space>
              <TagOutlined className="text-green-500" />
              <Title level={4} style={{ margin: 0 }}>
                Product Types
              </Title>
            </Space>
          }
          extra={<Text type="secondary">Maximum 2 types allowed</Text>}
        >
          <Form.List name="productTypes">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    className="bg-gray-50 border border-gray-200"
                    size="small"
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          label={
                            <Badge
                              count={`Type ${index + 1}`}
                              style={{
                                backgroundColor:
                                  index === 0 ? "#1890ff" : "#52c41a",
                              }}
                            />
                          }
                          rules={[
                            { required: true, message: "Missing type name" },
                          ]}
                        >
                          <Input
                            placeholder="e.g., Size, Color"
                            className="rounded-lg"
                          />
                        </Form.Item>

                        <Form.List name={[field.name, "productTypeDetails"]}>
                          {(
                            subFields,
                            { add: addDetail, remove: removeDetail }
                          ) => (
                            <div className="ml-6">
                              {subFields.map((subField, subIndex) => (
                                <Space key={subField.key} align="baseline">
                                  <Form.Item
                                    {...subField}
                                    name={[subField.name, "name"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing detail name",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder={`Enter ${form.getFieldValue([
                                        "productTypes",
                                        index,
                                        "name",
                                      ])} option`}
                                      className="rounded-lg"
                                    />
                                  </Form.Item>
                                  <Button
                                    type="text"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => removeDetail(subIndex)}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => addDetail()}
                                block
                                icon={<PlusOutlined />}
                                className="mt-2"
                              >
                                Add Option
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                        className="mt-4"
                      >
                        Remove Type
                      </Button>
                    )}
                  </Card>
                ))}
                {fields.length < 2 && (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    className="mt-4"
                  >
                    Add Product Type
                  </Button>
                )}
              </div>
            )}
          </Form.List>
        </Card>

        <Card
          className="shadow-md hover:shadow-lg transition-shadow"
          title={
            <Space>
              <DollarOutlined className="text-yellow-500" />
              <Title level={4} style={{ margin: 0 }}>
                Product Prices
              </Title>
            </Space>
          }
        >
          <Form.List name="productPrices">
            {(fields) => (
              <Table
                dataSource={fields.map((field) => ({
                  ...field,
                  key: field.key,
                  ...form.getFieldValue(["productPrices", field.name]),
                }))}
                pagination={false}
                className="border border-gray-200 rounded-lg"
                columns={[
                  {
                    title: "Type 1",
                    dataIndex: "productTypeDetails1",
                    key: "productTypeDetails1",
                    className: "bg-gray-50",
                  },
                  {
                    title: "Type 2",
                    dataIndex: "productTypeDetails2",
                    key: "productTypeDetails2",
                    className: "bg-gray-50",
                  },
                  {
                    title: "Price",
                    key: "price",
                    render: (_, __, index) => (
                      <Form.Item
                        name={[index, "price"]}
                        rules={[{ required: true, message: "Required" }]}
                        noStyle
                      >
                        <InputNumber
                          min={0}
                          style={{ width: "100%" }}
                          placeholder="Enter price"
                          className="rounded-lg"
                          prefix="$"
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Inventory",
                    key: "inventory",
                    render: (_, __, index) => (
                      <Form.Item
                        name={[index, "inventory"]}
                        rules={[{ required: true, message: "Required" }]}
                        noStyle
                      >
                        <InputNumber
                          min={0}
                          style={{ width: "100%" }}
                          placeholder="Enter inventory"
                          className="rounded-lg"
                        />
                      </Form.Item>
                    ),
                  },
                ]}
              />
            )}
          </Form.List>
        </Card>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="h-12 text-lg font-semibold rounded-lg"
          >
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
