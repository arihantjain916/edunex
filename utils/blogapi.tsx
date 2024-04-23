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

export const getAllBlogData = async () => {
  try {
    const response = await axios.get(`${API}/blog/all`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSpecificBlog = async (slug: string) => {
  try {
    const response = await axios.get(`${API}/blog/find/${slug}/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendBlogtoAPI = async (props: any) => {
  console.log(props);

  try {
    const token = getCookie();
    const response = await axios.post(
      `${API}/blog/add`,
      { title: props.title, tag: "random", content: props.content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateSpecificlog = async (
  id: string,
  title: string,
  content: any
) => {
  try {
    const token = getCookie();
    const response = await axios.patch(
      `${API}/blog/update/${id}`,
      { title: title, tag: "random", content: content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getBlogbyUsername = async (username: string) => {
  try {
    const response = await axios.get(`${API}/blog/user/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getBlogbyCategory = async (tag: string) => {
  try {
    const response = await axios.get(`${API}/blog/tag/${tag}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const blogAnalytics = async () => {
  try {
    const response = await axios.get(`${API}/blog/analytics`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
