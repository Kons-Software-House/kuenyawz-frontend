import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const retrieveClosedDates = async (from: string, to: string): Promise<any> => {
    const response = await apiClient.get('/closure', { params: { from, to } });
    return response.data;
};

export const createClosedDates = async (date: string, type: string, reason?: string): Promise<any> => {
    const data = [
        {
            date,
            type,
            reason
        }
    ];
    const response = await apiClient.post('/closure', data);
    return response.data;
};