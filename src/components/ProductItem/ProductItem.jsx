import "./ProductItem.css";

function ProductItem({ product, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <tr>
      <td className="product-name">{product.name}</td>
      <td>{product.category}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.quantity}</td>
      <td>
        <span
          className={`status ${
            product.status === "Available" ? "available" : "out-stock"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td>
        <div className="action-buttons">
          <button className="edit-btn" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(product.id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductItem;
