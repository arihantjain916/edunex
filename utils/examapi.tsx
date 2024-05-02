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

export const addExam = async (data: any) => {
  try {
    const response = await axios.post(`${API}/exam/add`, data, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllExam = async () => {
  try {
    const response = await axios.get(`${API}/exam/get`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getExambyId = async (id: string) => {
  try {
    const response = await axios.get(`${API}/exam/get/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateExam = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${API}/exam/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteExam = async (id: String) => {
  try {
    const response = await axios.delete(`${API}/exam/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addQuestion = async (data: any) => {
  try {
    const response = await axios.post(`${API}/exam/add-question`, data, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editQuestion = async (id: string, data: any) => {
  try {
    const response = await axios.patch(
      `${API}/exam/edit-question/${id}`,
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

export const deleteQuestion = async (id: string) => {
  try {
    const response = await axios.delete(`${API}/exam/delete-question/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
