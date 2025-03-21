import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import SiderComponent from "../components/common/SiderComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import HomePage from "../screens/HomeScreen";
import UsersScreen from "../screens/users/UsersScreen";
import UserDetailScreen from "../screens/users/UserDetailScreen";
import NotFound from "../screens/NotFound";
import AddUserScreen from "../screens/users/AddUserScreen";
import StoresScreen from "../screens/stores/StoresScreen";
import AddStoreScreen from "../screens/stores/AddStoreScreen";
import StoreDetailScreen from "../screens/stores/StoreDetailScreen";
import ServicesScreen from "../screens/services/ServicesScreen.tsx";
import ServiceDetailScreen from "../screens/services/ServiceDetailScreen.tsx";
import AddServiceScreen from "../screens/services/AddServiceScreen.tsx";
import ProductsScreen from "../screens/product/ProductsScreen.tsx";
import AddProductScreen from "../screens/product/AddProductScreen.tsx";
import ProductDetailScreen from "../screens/product/ProductDetailScreen.tsx";
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
              {/* Service route */}
              <Route>
                <Route path="/services" element={<ServicesScreen />} />
                <Route
                  path="/services/:serviceId"
                  element={<ServiceDetailScreen />}
                />
                <Route
                  path="/services/add-service"
                  element={<AddServiceScreen />}
                />
              </Route>
              <Route>
                <Route path="/users" element={<UsersScreen />} />
                <Route path="/users/add-user" element={<AddUserScreen />} />
                <Route path="/users/:id" element={<UserDetailScreen />} />
              </Route>

              {/* Store route */}
              <Route>
                <Route path="/products" element={<ProductsScreen />} />
                <Route
                  path="/products/add-product"
                  element={<AddProductScreen />}
                />
                <Route path="/products/:id" element={<ProductDetailScreen />} />
              </Route>

              {/* Store route */}
              <Route>
                <Route path="/stores" element={<StoresScreen />} />
                <Route path="/stores/add-store" element={<AddStoreScreen />} />
                <Route path="/stores/:id" element={<StoreDetailScreen />} />
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
