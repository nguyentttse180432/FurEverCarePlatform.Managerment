import { IUser } from "./IUser";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  setAuth: (user: IUser | null, token: string | null) => void; 
  register: ( email: string, password: string, name: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (email:string, name: string, password: string, phone: string) => Promise<boolean>;
}
