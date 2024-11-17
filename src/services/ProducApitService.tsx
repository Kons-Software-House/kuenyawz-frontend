import axios from "axios";
import JSONbig from 'json-bigint';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    transformResponse: [(data) => {
        // Use json-bigint to parse large numbers correctly
        return JSONbig.parse(data);
    }]

});

export const retrieveProducts = async (params?: any): Promise<any> => {
    const response = await apiClient.get('/products', { params });
    return response.data;
}

export const retrieveProductById = async (productId: string): Promise<any> => {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
}

export const retrieveProductsByCategory = async (category: string): Promise<any> => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
}

export const deleteProduct = async (productId: string): Promise<any> => {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
}

