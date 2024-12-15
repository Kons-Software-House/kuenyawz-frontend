import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "ngrok-skip-browser-warning": true
    },
});

export const createOrder = async (fullAddress: string, latitude: number, longitude: number, eventDate: string, paymentType: string, deliveryOption: string, purchaseItems: any[]): Promise<any> => {
    const data = {
        fullAddress,
        latitude,
        longitude,
        eventDate,
        paymentType,
        deliveryOption,
        purchaseItems,
        callbacks: {
            finish: `${import.meta.env.VITE_FRONTEND_URL}/cart`,
        }
    };
    const response = await apiClient.post('/orders', data);
    return response.data;
}

export const retrieveOrders = async (params?: any): Promise<any> => {
    const response = await apiClient.get('/orders', { params });
    return response.data;
}

export const retrieveOrder = async (purchaseId: string): Promise<any> => {
    const response = await apiClient.get(`/orders/${purchaseId}`);
    return response.data;
}

export const confirmOrder = async (purchaseId: string): Promise<any> => {
    const response = await apiClient.post(`/orders/${purchaseId}/confirm`);
    return response.data;
}

export const cancelOrder = async (purchaseId: string): Promise<any> => {
    const response = await apiClient.post(`/orders/${purchaseId}/cancel`);
    return response.data;
}

export const refundOrder = async (purchaseId: string): Promise<any> => {
    const response = await apiClient.post(`/orders/${purchaseId}/refund`);
    return response.data;
}

export const updateOrderStatus = async (purchaseId: string): Promise<any> => {
    const response = await apiClient.post(`/orders/${purchaseId}/status/next`);
    return response.data;
}