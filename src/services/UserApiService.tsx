import axios from "axios";
import JSONbig from 'json-bigint';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    transformResponse: [(data) => {
        return JSONbig.parse(data);
    }],
    withCredentials: true
});

export const retrieveUserCart = async (): Promise<any> => {
    const response = await apiClient.get('/user/cart');
    return response.data;
}

