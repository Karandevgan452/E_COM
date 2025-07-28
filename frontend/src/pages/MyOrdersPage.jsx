import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../css/MyOrdersPage.css";

function MyOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://e-com-0w79.onrender.com/api/orders/myorders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch user orders", err);
      }
    };

    fetchOrders();
  }, [token]);

  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                {order.isPaid ? `✔ (${order.paidAt.split("T")[0]})` : "✖"}
              </td>
              <td>
                {order.isDelivered
                  ? `✔ (${order.deliveredAt.split("T")[0]})`
                  : "✖"}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <button>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrdersPage;
