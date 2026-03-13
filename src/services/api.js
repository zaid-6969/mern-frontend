import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-api-l4a6.onrender.com/api/images",
});

export const getImages = () => API.get("/");
export const uploadImage = (data) =>
  API.post("/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteImage = (id) => API.delete(`/${id}`);

export const getImageById = (id) => API.get(`/${id}`);

// export const updateImage = (id, data) => API.put(`/update/${id}`, data)

export const updateImage = (id, data) => API.put(`/update/${id}`, data);
