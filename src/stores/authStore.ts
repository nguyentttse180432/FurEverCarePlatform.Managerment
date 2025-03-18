import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthState } from "../types/IAuth";

const authAPI = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      // 👇 Thêm setAuth để cập nhật user & token
      setAuth: (user, token) => set({ user, token }),

      register: async (email, password, name) => {
        try {
          const response = await fetch(`${authAPI}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
          });

          if (!response.ok) throw new Error("Registration failed");
          const data = await response.json();

          set({ user: data.user, token: data.accessToken });
          localStorage.setItem("auth-storage", JSON.stringify(data));

          return true;
        } catch (error) {
          console.error("Register error:", error);
          return false;
        }
      },

      login: async (emailOrPhone, password) => {
        try {
          const response = await fetch(`${authAPI}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailOrPhone, password }),
          });

          //if (!response.ok) throw new Error("Login failed");
          const data = await response.json();

          set({ user: data.user, token: data.token });
          localStorage.setItem("auth-storage", JSON.stringify(data));

          return true;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage");
      },

      updateProfile: async (email, name, password, phone) => {
        try {
          const response = await fetch(`${authAPI}/profile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
            body: JSON.stringify({ email, name, password, phone }),
          });

          if (!response.ok) throw new Error("Update failed");
          const data = await response.json();

          set({ user: data.user, token: data.token });
          localStorage.setItem("auth-storage", JSON.stringify(data));

          return true;
        } catch (error) {
          console.error("Update error:", error);
          return false;
        }
      },
    }),
    { name: "auth-storage" }
  )
);
