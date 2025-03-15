/** @format */

import { Flex, Layout, Menu, MenuProps, Image, Typography } from "antd";
import { Link } from "react-router";
import { MdOutlineInventory } from "react-icons/md";
import { appInfo } from "../../constants/appInfos";
import { colors } from "../../constants/colors";
import { TbHome2 } from "react-icons/tb";
import { AiFillShop } from "react-icons/ai";
import { AiOutlineTable } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const SiderComponent = () => {
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to={"/"}>Dashboard</Link>,
      icon: <TbHome2 size={20} />,
    },
    {
      key: "users",
      label: "Users",
      icon: <MdOutlineInventory size={20} />,
      children: [
        {
          key: "users",
          label: <Link to={"/users"}>All</Link>,
        },
        {
          key: "addNew",
          label: <Link to={`/users/add-user`}>Add new</Link>,
        },
      ],
    },
    {
      key: "stores",
      label: "Stores Mangament",
      icon: <AiFillShop size={20} />,
      children: [
        {
          key: "stores",
          label: <Link to={"/stores"}>All</Link>,
          icon: <AiOutlineTable />,
        },
        {
          key: "addNew",
          label: <Link to={`/stores/add-store`}>Add new</Link>,
          icon: <AiOutlineFileAdd />,
        },
      ],
    },
  ];
  return (
    <Sider width={280} theme="light" style={{ height: "100vh" }}>
      <Flex style={{ padding: "20px" }} align="middle">
        <Image width={40} src={appInfo.logo} alt={appInfo.title} />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: colors.primary500,
            margin: 0,
          }}
        >
          {appInfo.title}
        </Text>
      </Flex>
      <Menu mode="inline" items={items} theme="light" />
    </Sider>
  );
};

export default SiderComponent;
