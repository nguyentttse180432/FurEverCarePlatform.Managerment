import axios from "axios";

export const client = axios.create({
    baseURL : 'http://localhost:5225/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})