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

export const addToUserCart = async (variantId: string, quantity: number, note: string): Promise<any> => {
    if (note === '' || note === null || note === undefined) {
        return await apiClient.post('/user/cart', { variantId, quantity });
    } else {
        return await apiClient.post('/user/cart', { variantId, quantity, note });
    }
}

export const deleteFromUserCart = async (cartItemId: string): Promise<any> => {
    const response = await apiClient.delete(`/user/cart/${cartItemId}`);
    return response.data;
}

export const updateCartItem = async (cartItemId: string, variantId: string, quantity: number, note: string): Promise<any> => {
    if (note === '' || note === null || note === undefined) {
        return await apiClient.patch(`/user/cart/${cartItemId}`, { variantId, quantity });
    } else {
        return await apiClient.patch(`/user/cart/${cartItemId}`, { variantId, quantity, note });
    }
}