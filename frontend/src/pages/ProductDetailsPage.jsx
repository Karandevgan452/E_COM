import { useParams , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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
        const res = await axios.get(
          `https://e-com-0w79.onrender.com/api/products/${id}`
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load product", error);
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
    alert("Added to cart!");
    navigate("/cart");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div className="info">
        <h2>{product.name}</h2>
        <p className="desc">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>

        {product.countInStock > 0 && (
          <>
            <label>Quantity: </label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
