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

export const addReport = async (data: any) => {
  try {
    const response = await axios.post(
      `${API}/report/add`,
      {
        headers: {
          Authorization: `Bearer ${getCookie()}`,
        },
      },
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllReport = async () => {
  try {
    const response = await axios.get(`${API}/report/get`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserReport = async () => {
  try {
    const response = await axios.get(`${API}/report/get-report-user`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
