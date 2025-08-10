import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../css/ShopPage.css";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        toast.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="page-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      <div className="page-header">
        <div className="header-content">
          <h2 className="home-title">
            <span className="title-accent">Our Products</span>
          </h2>
          <div className="home-subtitle">
            Discover the latest and best-selling products, handpicked for you.
          </div>
          <div className="header-line"></div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">Loading products...</div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product, idx) => (
            <div
              className="product-item card-hover"
              style={{ animationDelay: `${idx * 0.08}s` }}
              key={product._id}
              tabIndex={0}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopPage;
