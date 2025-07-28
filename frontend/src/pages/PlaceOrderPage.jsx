import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    setPlacingOrder(true);
    try {
      const res = await axios.post(
        "https://e-com-0w79.onrender.com/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
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

      localStorage.removeItem("cart"); // Clear cart after placing order
      navigate(`/order/${res.data._id}`); // Redirect to confirmation page
    } catch (err) {
      console.error("Failed to place order", err);
      alert("Something went wrong placing the order.");
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
          {shippingAddress.fullName}, {shippingAddress.address},{" "}
          {shippingAddress.city}, {shippingAddress.postalCode},{" "}
          {shippingAddress.country}
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
