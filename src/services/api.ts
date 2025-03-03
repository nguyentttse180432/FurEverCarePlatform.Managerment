import axios from "axios";
import { IUser } from "../models/IUser";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})


export const fetchUsers = async (): Promise<IUser[]> => {
  const response = await api.get<IUser[]>('/users');
  return response.data;
};