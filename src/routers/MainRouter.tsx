import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import SiderComponent from "../components/common/SiderComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import HomePage from "../screens/HomeScreen";
import UsersScreen from "../screens/users/UsersScreen";
import UserDetailScreen from "../screens/users/UserDetailScreen";
import NotFound from "../screens/NotFound";
const { Content, Footer } = Layout;
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Affix offsetTop={0}>
          <SiderComponent />
        </Affix>
        <Layout
          style={{
            backgroundColor: "white !important",
          }}
        >
          <Affix offsetTop={0}>
            <HeaderComponent />
          </Affix>
          <Content className="pt-3 container-fluid">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
              <Route>
                <Route path="/users" element={<UsersScreen />} />
                {/* <Route path="/users/add-user" element={<AddUser />} /> */}
                <Route path="/users/:id" element={<UserDetailScreen />} />
              </Route>

              {/* Add more route here */}
            </Routes>
          </Content>
          <Footer className="bg-white" />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
