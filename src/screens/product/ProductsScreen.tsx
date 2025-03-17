import {
    Button,
    Drawer,
    Flex,
    Space,
    Table,
    TableProps,
    Tooltip,
    Typography,
    message,
} from "antd";
import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";
import { IProduct } from "../../types/IProduct";
import { getProducts } from "../../services/product.service";
import { useNavigate } from "react-router";
import { AiTwotoneEye } from "react-icons/ai";

const ProductsScreen = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openViewDrawer, setOpenViewDrawer] = useState<boolean>(false);
    const [isDrawerLoading, setIsDrawerLoading] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data.items);
        } catch (error) {
            message.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        document.title = "Store Management";
    }, []);

    const showLoading = () => {
        navigate("add-product", { replace: true });
    };

    const columns: TableProps<IProduct>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Product Code",
            dataIndex: "productCode",
            key: "productCode",
        },
        {
            title: "Brand Name",
            dataIndex: "brandName",
            key: "brandName",
        },
        {
            title: "Store Name",
            dataIndex: "storeName",
            key: "storeName",
        },
        {
            title: "Category Name",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Min Prices",
            dataIndex: "minPrices",
            key: "minPrices",
        },
        {
            title: "Action",
            key: "action",
            width: "15%",
            render: (item) => (
                <Space size="middle">
                    <AiTwotoneEye size={20}
                        onClick={() => navigate(`${item.id}`, { replace: true })}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Space
                style={{ width: "100%", padding: "0px 20px" }}
                direction="vertical"
            >
                <Typography style={{ fontSize: 30, marginTop: 20, fontWeight: 600 }}>
                    Store Management
                </Typography>
                <div
                    style={{
                        backgroundColor: colors.white,
                        width: "100%",
                        borderRadius: 10,
                        padding: "10px 20px",
                        marginTop: 20,
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Flex justify="space-between" align="center">
                        <h3>Stores List</h3>
                        <div>
                            <Button
                                type="primary"
                                style={{ marginLeft: "auto", marginRight: 10 }}
                                icon={<AiOutlinePlus />}
                                onClick={() => navigate("add-product", {replace: true})}
                            >
                                Add Product
                            </Button>
                            <Tooltip title="Reload">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<AiOutlineReload />}
                                    onClick={fetchProducts}
                                    loading={loading}
                                />
                            </Tooltip>
                        </div>
                    </Flex>
                    <Table<IProduct>
                        columns={columns}
                        dataSource={products}
                        loading={loading}
                        style={{ width: "100%" }}
                    />
                </div>
            </Space>
            <Drawer
                closable
                destroyOnClose
                title={<p>Store detail</p>}
                placement="right"
                open={openViewDrawer}
                loading={isDrawerLoading}
                onClose={() => setOpenViewDrawer(false)}
                width={600}
            >
                <Button
                    type="primary"
                    style={{ marginBottom: 16 }}
                    onClick={showLoading}
                >
                    Reload
                </Button>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};

export default ProductsScreen;
