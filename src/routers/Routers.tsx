import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore"; // Import Zustand store
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { localDataNames } from "../constants/appInfos";
import { Spin } from "antd";

const Routers = () => {
  const [isLoading, setIsLoading] = useState(true); // ✅ Bắt đầu với isLoading = true

  const { token, setAuth } = useAuthStore(); // ✅ Lấy auth state từ Zustand

  useEffect(() => {
    const getData = () => {
      try {
        const storedData = localStorage.getItem(localDataNames.authData);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.token) {
            setAuth(parsedData.user, parsedData.token); // ✅ Truyền đúng định dạng {user, token}
          }
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
      } finally {
        setIsLoading(false); // ✅ Kết thúc loading sau khi kiểm tra xong
      }
    };

    getData();
  }, [setAuth]);

  return isLoading ? <Spin /> : !token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
