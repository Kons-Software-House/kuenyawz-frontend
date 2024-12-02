import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const createOrder = async (fullAddress: string, latitude: number, longitude: number, eventDate: string, paymentType: string, deliveryOption: string, purchaseItems: any[]): Promise<any> => {
    const data = {
        fullAddress,
        latitude,
        longitude,
        eventDate,
        paymentType,
        deliveryOption,
        purchaseItems
    };
    const response = await apiClient.post('/orders', data);
    return response.data;
}

export const retrieveOrders = async (params?: any): Promise<any> => {
    const response = await apiClient.get('/orders', { params });
    return response.data;
}