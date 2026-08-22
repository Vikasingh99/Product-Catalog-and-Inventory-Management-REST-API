import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchProducts } from "./features/products/productThunks";

import Header from "./components/Header/Header";
import DashboardSummary from "./components/DashboardSummary/DashboardSummary";
import ProductForm from "./components/ProductForm/ProductForm";
import ProductList from "./components/ProductList/ProductList";

function App() {
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />

      <main className="container">
        <DashboardSummary />

        <ProductForm
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />

        <ProductList setEditingProduct={setEditingProduct} />
      </main>

      <footer className="footer">
        <p>Product Inventory Management System</p>
      </footer>
    </>
  );
}

export default App;
