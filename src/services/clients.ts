import axios from "axios";

export const client = axios.create({
    baseURL : 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json'
    }
})