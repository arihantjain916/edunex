import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const sendDataToRegisterApi = async (data: any) => {
  try {
    const response = await axios.post(`${API}/user/register/`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendDatatoLoginApi = async (data: any) => {
  try {
    const response = await axios.post(`${API}/user/login/`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

