import React, { useEffect, useState } from "react";
import { 
    Card, 
    Descriptions, 
    Tag, 
    Space, 
    Typography, 
    Divider, 
    Row, 
    Col, 
    Table, 
    Badge, 
    Button,
    Image,
    Statistic,
    Spin,
    message,
    Input,
    InputNumber,
    Form,
    Select,
    Modal,
    Popconfirm,
    Switch
} from "antd";
import { 
    TagOutlined, 
    ShopOutlined, 
    BarcodeOutlined,
    DollarOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    LoadingOutlined,
    PlusOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from "react-router";
import { getProductById, deleteProduct, updateProduct } from "../../services/product.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdateProduct } from "../../types/IProduct";

const { Title, Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProductDetailScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [editingPrice, setEditingPrice] = useState<string | null>(null);

    const { 
        data: productDetail,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id!),
        enabled: !!id
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            message.success('Product deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            navigate('/products');
        },
        onError: (error) => {
            message.error('Failed to delete product');
            console.error('Delete error:', error);
        }
    });

    const updateMutation = useMutation({
        mutationFn: (updatedProduct: IUpdateProduct) => 
            updateProduct(id!, updatedProduct),
        onSuccess: () => {
            message.success('Product updated successfully');
            queryClient.invalidateQueries({ queryKey: ['product', id] });
            setIsEditing(false);
        },
        onError: (error) => {
            message.error('Failed to update product');
            console.error('Update error:', error);
        }
    });

    useEffect(() => {
        if (productDetail) {
            form.setFieldsValue(productDetail);
        }
    }, [productDetail, form]);

    const handleDelete = () => {
        if (id) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            updateMutation.mutate({
                ...productDetail,
                ...values
            });
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        form.setFieldsValue(productDetail);
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin indicator={antIcon} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <Card>
                    <div className="text-center">
                        <Title level={4} type="danger">Error Loading Product</Title>
                        <Text type="secondary">{(error as Error)?.message}</Text>
                        <div className="mt-4">
                            <Button onClick={() => navigate('/products')}>
                                Back to Products
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (!productDetail) {
        return (
            <div className="p-6">
                <Card>
                    <div className="text-center">
                        <Title level={4}>Product Not Found</Title>
                        <div className="mt-4">
                            <Button onClick={() => navigate('/products')}>
                                Back to Products
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Card className="mb-6">
                <Space className="w-full justify-between">
                    <Space>
                        <Button 
                            icon={<ArrowLeftOutlined />} 
                            onClick={() => navigate('/products')}
                        >
                            Back to Products
                        </Button>
                        <Title level={4} style={{ margin: 0 }}>Product Details</Title>
                    </Space>
                    <Space>
                        {isEditing ? (
                            <>
                                <Button 
                                    type="primary" 
                                    onClick={handleSave}
                                    loading={updateMutation.isPending}
                                >
                                    Save Changes
                                </Button>
                                <Button onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    icon={<EditOutlined />} 
                                    type="primary"
                                    onClick={handleEdit}
                                >
                                    Edit Product
                                </Button>
                                <Popconfirm
                                    title="Delete Product"
                                    description="Are you sure you want to delete this product?"
                                    onConfirm={handleDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button 
                                        icon={<DeleteOutlined />} 
                                        danger
                                        loading={deleteMutation.isPending}
                                    >
                                        Delete Product
                                    </Button>
                                </Popconfirm>
                            </>
                        )}
                    </Space>
                </Space>
            </Card>

            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} xl={16}>
                        <Card 
                            title={
                                <Space>
                                    <TagOutlined className="text-blue-500" />
                                    <span>Basic Information</span>
                                </Space>
                            }
                            className="mb-6"
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Product Name"
                                        rules={[{ required: true, message: 'Please enter product name' }]}
                                    >
                                        {isEditing ? (
                                            <Input />
                                        ) : (
                                            <Text strong>{productDetail?.name}</Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="productCode"
                                        label="Product Code"
                                        rules={[{ required: true, message: 'Please enter product code' }]}
                                    >
                                        {isEditing ? (
                                            <Input />
                                        ) : (
                                            <Space>
                                                <BarcodeOutlined />
                                                {productDetail?.productCode}
                                            </Space>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="brandName"
                                        label="Brand"
                                        rules={[{ required: true }]}
                                    >
                                        {isEditing ? (
                                            <Select>
                                                <Select.Option value={productDetail?.brandName}>
                                                    {productDetail?.brandName}
                                                </Select.Option>
                                            </Select>
                                        ) : (
                                            <Tag color="blue">{productDetail?.brandName}</Tag>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="storeName"
                                        label="Store"
                                        rules={[{ required: true }]}
                                    >
                                        {isEditing ? (
                                            <Select>
                                                <Select.Option value={productDetail?.storeName}>
                                                    {productDetail?.storeName}
                                                </Select.Option>
                                            </Select>
                                        ) : (
                                            <Tag color="green">{productDetail?.storeName}</Tag>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="categoryName"
                                        label="Category"
                                        rules={[{ required: true }]}
                                    >
                                        {isEditing ? (
                                            <Select>
                                                <Select.Option value={productDetail?.categoryName}>
                                                    {productDetail?.categoryName}
                                                </Select.Option>
                                            </Select>
                                        ) : (
                                            <Tag color="yellow">{productDetail?.categoryName}</Tag>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="isActive"
                                        label="Status"
                                        valuePropName="checked"
                                    >
                                        {isEditing ? (
                                            <Switch />
                                        ) : (
                                            <Badge 
                                                status={productDetail?.isActive ? "success" : "error"} 
                                                text={productDetail?.isActive ? "Active" : "Inactive"} 
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card 
                            title={
                                <Space>
                                    <TagOutlined className="text-green-500" />
                                    <span>Product Types</span>
                                </Space>
                            }
                            className="mb-6"
                            extra={isEditing && (
                                <Button type="link" onClick={() => {/* Handle edit types */}}>
                                    Edit Types
                                </Button>
                            )}
                        >
                            {isEditing ? (
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
                            ) : (
                                productDetail.productTypes.map((type, index) => (
                                    <div key={type.name} className="mb-4">
                                        <Title level={5}>
                                            <Badge 
                                                count={`Type ${index + 1}: ${type.name}`}
                                                style={{ 
                                                    backgroundColor: index === 0 ? '#1890ff' : '#52c41a' 
                                                }}
                                            />
                                        </Title>
                                        <div className="ml-6 mt-2">
                                            <Space wrap>
                                                {type.productTypeDetails.map(detail => (
                                                    <Tag key={detail.name}>{detail.name}</Tag>
                                                ))}
                                            </Space>
                                        </div>
                                        {index < productDetail.productTypes.length - 1 && <Divider />}
                                    </div>
                                ))
                            )}
                        </Card>

                        <Card 
                            title={
                                <Space>
                                    <DollarOutlined className="text-yellow-500" />
                                    <span>Product Prices</span>
                                </Space>
                            }
                        >
                            <Table
                                dataSource={productDetail?.productPrices}
                                pagination={false}
                                scroll={{ x: true }}
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
                                        dataIndex: 'price',
                                        key: 'price',
                                        render: (price: number, record: any, index: number) => (
                                            isEditing ? (
                                                <Form.Item
                                                    name={['productPrices', index, 'price']}
                                                    style={{ margin: 0 }}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        style={{ width: '100%' }}
                                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    />
                                                </Form.Item>
                                            ) : (
                                                <Text strong className="text-green-600">
                                                    ${price.toLocaleString()}
                                                </Text>
                                            )
                                        ),
                                    },
                                    {
                                        title: 'Inventory',
                                        dataIndex: 'inventory',
                                        key: 'inventory',
                                        render: (inventory: number, record: any, index: number) => (
                                            isEditing ? (
                                                <Form.Item
                                                    name={['productPrices', index, 'inventory']}
                                                    style={{ margin: 0 }}
                                                >
                                                    <InputNumber min={0} style={{ width: '100%' }} />
                                                </Form.Item>
                                            ) : (
                                                <Badge 
                                                    count={inventory} 
                                                    showZero 
                                                    color={
                                                        inventory > 10 
                                                            ? 'green' 
                                                            : inventory > 0 
                                                            ? 'orange' 
                                                            : 'red'
                                                    }
                                                />
                                            )
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} xl={8}>
                        <Card className="mb-6">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic
                                        title="Total Variants"
                                        value={productDetail?.productPrices.length}
                                        prefix={<TagOutlined />}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Total Inventory"
                                        value={productDetail?.productPrices.reduce(
                                            (sum, price) => sum + price.inventory, 
                                            0
                                        )}
                                        prefix={<ShopOutlined />}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Min Price"
                                        value={Math.min(
                                            ...productDetail?.productPrices.map(p => p.price)
                                        )}
                                        prefix="$"
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Max Price"
                                        value={Math.max(
                                            ...productDetail?.productPrices.map(p => p.price)
                                        )}
                                        prefix="$"
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Card 
                            title={
                                <Space>
                                    <TagOutlined className="text-purple-500" />
                                    <span>Product Images</span>
                                </Space>
                            }
                        >
                            <Image.PreviewGroup>
                                <Row gutter={[8, 8]}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <Col span={12} key={i}>
                                            <Image
                                                src={`https://placeholder.com/300x300?text=Product+${i}`}
                                                alt={`Product Image ${i}`}
                                                className="rounded-lg"
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Image.PreviewGroup>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ProductDetailScreen;
