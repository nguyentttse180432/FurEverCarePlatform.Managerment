import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import SiderComponent from "../components/common/SiderComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import NotFound from "../screens/NotFound";
import StoresScreen from "../screens/stores/StoresScreen";
import AddStoreScreen from "../screens/stores/AddStoreScreen";
import StoreDetailScreen from "../screens/stores/StoreDetailScreen";
import ServicesScreen from "../screens/services/ServicesScreen.tsx";
import ServiceDetailScreen from "../screens/services/ServiceDetailScreen.tsx";
import AddServiceScreen from "../screens/services/AddServiceScreen.tsx";
import ProductsScreen from "../screens/product/ProductsScreen.tsx";
import AddProductScreen from "../screens/product/AddProductScreen.tsx";
import ProductDetailScreen from "../screens/product/ProductDetailScreen.tsx";
import Profile from "../screens/auth/Profile.tsx";
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
              <Route path="/" element={<StoresScreen />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile" element={<Profile />} />

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

              {/* Product route */}
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
