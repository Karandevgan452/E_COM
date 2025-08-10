import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../css/ProductDetailsPage.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load product", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existItem = cartItems.find((item) => item._id === product._id);

    let updatedCart;
    if (existItem) {
      updatedCart = cartItems.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, qty }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
    navigate("/cart");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return toast.error("Product not found.");

  return (  
    <div className="product-details-page">
      <div className="product-card">
        <div className="product-card-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-card-info">
          <h2 className="title">{product.title}</h2>
          <p className="desc">{product.description}</p>
          <div className="meta">
            <span className="category">{product.category}</span>
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          <div className="rating">
            ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0}{" "}
            reviews)
          </div>
          <div className="actions">
            <label htmlFor="quantity" className="qty-label">
              Qty:
            </label>
            <select
              className="qty-select"
              id="quantity"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
