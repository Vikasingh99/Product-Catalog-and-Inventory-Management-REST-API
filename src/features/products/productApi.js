import api from "../../services/api";

export const fetchProductsApi = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProductApi = async (product) => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProductApi = async (product) => {
  const response = await api.put(`/products/${product.id}`, product);
  return response.data;
};

export const deleteProductApi = async (id) => {
  await api.delete(`/products/${id}`);
  return id;
};
