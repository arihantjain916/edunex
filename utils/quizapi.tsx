import axios from "axios";
import cookie from "js-cookie";

const API = process.env.NEXT_PUBLIC_API_URL;

function getCookie() {
  try {
    return cookie.get("AUTH_TOKEN");
  } catch {
    return "Unable to get cookie...";
  }
}

export const sendDataToQuizApi = async (data: any) => {
  try {
    const response = await axios.post(`${API}/quiz/save/`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
      data,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllQuizData = async () => {
  try {
    const response = await axios.post(`${API}/quiz/all/`);
    return response.data;
  } catch (error) {
    return error;
  }
};
