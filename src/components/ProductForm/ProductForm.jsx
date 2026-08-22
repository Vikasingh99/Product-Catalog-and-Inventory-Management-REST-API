import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  addProduct,
  updateProduct,
} from "../../features/products/productThunks";

import "./ProductForm.css";

function ProductForm({ editingProduct, setEditingProduct }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
    status: "Available",
  });

  // When editingProduct changes, populate the form
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: editingProduct.id,
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        status: editingProduct.status,
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.quantity
    ) {
      alert("Please fill in all fields");
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      status: formData.status,
    };

    if (editingProduct) {
      // Update existing product
      dispatch(updateProduct({ id: formData.id, ...productData }));
      setEditingProduct(null);
    } else {
      // Add new product
      dispatch(addProduct(productData));
    }

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      quantity: "",
      status: "Available",
    });
    setEditingProduct(null);
  };

  return (
    <section className="form-card">
      <div className="section-header">
        <div>
          <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <p>
            {editingProduct
              ? "Update product information below"
              : "Enter product information below"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price</label>

            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>

            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>

          <button
            type="reset"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            {editingProduct ? "Cancel" : "Clear"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
