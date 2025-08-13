import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "../css/PlaceOrderPage.css";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const shipping = JSON.parse(localStorage.getItem("shippingAddress")) || {};
    setCartItems(cart);
    setShippingAddress(shipping);
  }, []);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = +(0.1 * itemsPrice).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const handlePlaceOrder = async () => {
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!shippingAddress.fullName || !shippingAddress.address) {
      toast.error("Please provide shipping address");
      return;
    }

    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    setPlacingOrder(true);
    try {
      const res = await API.post(
        "/orders",
        {
          orderItems: cartItems.map((item) => ({
            name:
              item.name || item.title || item.productName || "Unknown Product",
            qty: item.qty || item.quantity || 1,
            image: item.image || item.imageUrl || "",
            price: item.price || 0,
            product: item._id || item.id || item.productId,
          })),
          shippingAddress,
          paymentMethod: "Cash on Delivery",
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart");
      toast.success("Order placed successfully!");
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to place order. Please try again.";
      toast.error(errorMessage);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="place-order-container">
      <h2>Place Order</h2>

      <div className="section">
        <h3>Shipping</h3>
        <p>
          {shippingAddress.fullName || "N/A"},{" "}
          {shippingAddress.address || "N/A"}, {shippingAddress.city || "N/A"},{" "}
          {shippingAddress.postalCode || "N/A"},{" "}
          {shippingAddress.country || "N/A"}
        </p>
      </div>

      <div className="section">
        <h3>Order Items</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="order-item">
            <img src={item.image} alt={item.name} />
            <p>
              {item.name} x {item.qty} = ${(item.qty * item.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Summary</h3>
        <p>Items: ${itemsPrice.toFixed(2)}</p>
        <p>Shipping: ${shippingPrice.toFixed(2)}</p>
        <p>Tax: ${taxPrice.toFixed(2)}</p>
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
      </div>

      <button onClick={handlePlaceOrder} disabled={placingOrder}>
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default PlaceOrderPage;
