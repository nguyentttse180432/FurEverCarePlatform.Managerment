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
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const StoresScreen = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
  // const [openUpdateDrawer, setOpenUpdateDrawer] = useState<boolean>(false);
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
        {/* <Space
          style={{
            backgroundColor: colors.white,
            width: "100%",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Filter</h3>
        </Space> */}

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

export default StoresScreen;
