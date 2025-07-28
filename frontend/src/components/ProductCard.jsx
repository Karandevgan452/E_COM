import { Link } from "react-router-dom";
import "../css/ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <Link to={`/product/${product._id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
