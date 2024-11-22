import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export const registerAccount = async (fullName: string, phone: string, password: string): Promise<any> => {
  const response = await apiClient.post('/auth/register', { fullName, phone, password });
  return response.data;
}

