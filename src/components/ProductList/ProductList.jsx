import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productSelectors";
import { deleteProduct } from "../../features/products/productThunks";

import ProductItem from "../ProductItem/ProductItem";

import "./ProductList.css";

function ProductList({ setEditingProduct }) {
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Sort By");

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Filter products based on search term
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Filter products based on status
  if (statusFilter !== "All Status") {
    filteredProducts = filteredProducts.filter(
      (product) => product.status === statusFilter,
    );
  }

  // Sort products
  if (sortBy === "Product Name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Price Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "Quantity Low to High") {
    filteredProducts.sort((a, b) => a.quantity - b.quantity);
  } else if (sortBy === "Quantity High to Low") {
    filteredProducts.sort((a, b) => b.quantity - a.quantity);
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="product-card">
      <div className="product-header">
        <div>
          <h2>Product List</h2>
          <p>Manage all inventory products</p>
        </div>

        <span className="product-count">{products.length} Products</span>
      </div>

      {/* Search and Filter */}
      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Available</option>
            <option>Out of Stock</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Sort By</option>
            <option>Product Name</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Quantity Low to High</option>
            <option>Quantity High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductList;
