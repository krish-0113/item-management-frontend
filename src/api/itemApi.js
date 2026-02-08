import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllItems = () => api.get("/items");
export const createItem = (item) => api.post("/items", item);
export const deleteItem = (id) => api.delete(`/items/${id}`);
