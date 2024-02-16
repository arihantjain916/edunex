import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllBlogData = async () => {
  try {
    const response = await axios.get(`${API}/blog/all/`);
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
