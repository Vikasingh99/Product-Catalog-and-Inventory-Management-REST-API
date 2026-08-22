import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchProductsApi,
  fetchProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "./productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProductsApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch products.",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchProductByIdApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch product.",
      );
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      return await createProductApi(product);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to add product.",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      return await updateProductApi(product);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to update product.",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteProductApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to delete product.",
      );
    }
  },
);
