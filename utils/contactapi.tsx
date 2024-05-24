import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export interface Contact {
  name: string;
  email: string;
  message: string;
  phone: string;
}

export const sendDataToContactApi = async (props: Contact) => {
  try {
    const response = await axios.post(`${API}/contact/add/`, {
      ...props,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to comment API:", error); 
    throw error;
  }
};
