import axios from "axios";
import JSONbig from 'json-bigint';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    transformResponse: [(data) => {
        return JSONbig.parse(data);
    }],
    withCredentials: true
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

export const retrieveRecommendedProducts = async (productId: string): Promise<any> => {
    const response = await apiClient.get(`/recommender/${productId}`, { params: { addRandom: true } });
    return response.data;
}

export const deleteProduct = async (productId: string): Promise<any> => {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
}

export const deleteVariant = async (productId: string, variantId: string): Promise<any> => {
    const response = await apiClient.delete(`/products/${productId}/variants/${variantId}`);
    return response.data;
}

export const createProduct = async (product: any): Promise<any> => {
    const response = await apiClient.post('/products', product);
    return response.data;
}

export const editProduct = async (product: any, productId: string): Promise<any> => {
    const response = await apiClient.patch(`/products/${productId}`, product);
    return response.data;
}

export const uploadProductImages = async (productId: string, images: File[]): Promise<any> => {
    const formData = new FormData();
    images.forEach((image, index) => {
        formData.append(`files`, image, `image${index}.jpg`);
    });
    const response = await apiClient.post(`/images/${productId}/batch`, formData);
    return response.data;
}