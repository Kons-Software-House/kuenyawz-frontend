import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export const registerAccount = async (fullName: string, phone: string, password: string): Promise<any> => {
  const response = await apiClient.post('/auth/register', { fullName, phone, password });
  return response.data;
}

export const loginAccount = async (phone: string, password: string): Promise<any> => {
  const response = await apiClient.post('/auth/login', { phone, password });
  return response.data;
}

export const checkAuthentication = async (): Promise<any> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
}

export const refreshAuthentication = async (): Promise<any> => {
  const response = await apiClient.post('/auth/refresh');
  return response.data;
}

export const logoutAccount = async (): Promise<any> => {
  const response = await apiClient.post('/auth/revoke');
  return response.data;
}