import {
    Button,
    Drawer,
    Flex,
    Space,
    Table,
    TableProps,
    Tag,
    Tooltip,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";

interface DataType {
    id: string;
    name: string;
    productCode: string;
    brandName: string;
    storeName: string;
    categoryName: string;
    minPrices: number;
}

const data: DataType[] = [
    {
        id: "c388a266-c465-4ca0-1566-08dd6374dc34",
        name: "hạt cho mèo",
        productCode: "21233",
        brandName: "PetCare",
        storeName: "Pet World",
        categoryName: "toy",
        minPrices: 120000,
    },
    {
        id: "e0f01762-f5b3-4161-d95c-08dd641b9320",
        name: "Sup thuong cho cho connn",
        productCode: "123",
        brandName: "PetFoods",
        storeName: "Pet World",
        categoryName: "toy",
        minPrices: 120000,
    },
];


const ProductsScreen = () => {
    const columns: TableProps<DataType>["columns"] = [
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
            render: (_) => (
                <Space size="middle">
                    <a onClick={showLoading}>View</a>
                    <a>Update</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const [openViewDrawer, setOpenViewDrawer] = useState<boolean>(false);
    const [isDrawerLoading, setIsDrawerLoading] = useState<boolean>(false);

    const showLoading = () => {
        setOpenViewDrawer(true);
        setIsDrawerLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setIsDrawerLoading(false);
        }, 500);
    };

    useEffect(() => {
        document.title = "Store Management";
    }, []);

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
                            >
                                Add Store
                            </Button>
                            <Tooltip title="Reload">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<AiOutlineReload />}
                                />
                            </Tooltip>
                        </div>
                    </Flex>
                    <Table<DataType>
                        columns={columns}
                        dataSource={data}
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
