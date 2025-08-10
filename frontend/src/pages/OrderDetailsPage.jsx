import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../css/OrderDetailsPage.css";
import { toast } from "react-toastify";

function OrderDetailsPage() {
  const { id } = useParams(); // order ID from URL
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch order", err);
      }
    };

    fetchOrder();
  }, [id, token]);

  if (loading || !order) return <p>Loading order...</p>;

  const {
    _id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <div className="order-details-container">
      <h2>Order #{_id}</h2>

      <div className="section">
        <h3>Shipping</h3>
        <p>{shippingAddress.fullName}</p>
        <p>
          {shippingAddress.address}, {shippingAddress.city},{" "}
          {shippingAddress.postalCode}, {shippingAddress.country}
        </p>
        <p>
          Status:{" "}
          {isDelivered ? `Delivered on ${deliveredAt}` : "Not Delivered"}
        </p>
      </div>

      <div className="section">
        <h3>Payment</h3>
        <p>Method: {paymentMethod}</p>
        <p>Status: {isPaid ? `Paid on ${paidAt}` : "Not Paid"}</p>
      </div>

      <div className="section">
        <h3>Order Items</h3>
        {orderItems.map((item, idx) => (
          <div key={idx} className="order-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>
              {item.qty} x ${item.price.toFixed(2)} = $
              {(item.qty * item.price).toFixed(2)}
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
      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default OrderDetailsPage;
