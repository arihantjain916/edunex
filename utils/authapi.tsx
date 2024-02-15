import axios from "axios";

export const sendDataToRegisterApi = async (data: any) => {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${API}/user/register/`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending data to API:", error);
    return error;
  }
};

export const sendDatatoLoginApi = async (data: any) => {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${API}/user/login/`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending data to API:", error);
    return error;
  }
};
