import { useSelector } from "react-redux";

import {
  selectTotalProducts,
  selectAvailableProducts,
  selectOutOfStockProducts,
} from "../../features/products/productSelectors";

function DashboardSummary() {
  const totalProducts = useSelector(selectTotalProducts);

  const availableProducts = useSelector(selectAvailableProducts);

  const outOfStockProducts = useSelector(selectOutOfStockProducts);

  return (
    <section className="dashboard">
      <div className="summary-card">
        <div className="summary-icon">📦</div>

        <div>
          <p>Total Products</p>
          <h2>{totalProducts}</h2>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">✅</div>

        <div>
          <p>Available</p>
          <h2>{availableProducts}</h2>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">⚠️</div>

        <div>
          <p>Out of Stock</p>
          <h2>{outOfStockProducts}</h2>
        </div>
      </div>
    </section>
  );
}

export default DashboardSummary;
