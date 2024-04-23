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

export const sendDataToCommentApi = async (slug: string, comment: string) => {
  const token = getCookie();
  try {
    const response = await axios.post(
      `${API}/comment/add/${slug}`,
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllComment = async (slug: string) => {
  try {
    const response = await axios.get(`${API}/comment/get/${slug}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllCommentofUser = async () => {
  try {
    const response = await axios.get(`${API}/comment/get-all-comment`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
