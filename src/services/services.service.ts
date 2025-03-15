import { IServices } from "../types/IServices.ts";
import { client } from "./clients";

const fetchServices = async () => {
    const response = await client.get<IServices[]>("/services");
    return response.data;
};

const fetchService = async (id: number) => {
    const response = await client.get<IServices>(`/services/${id}`);
    return response.data;
};

export { fetchServices, fetchService };
