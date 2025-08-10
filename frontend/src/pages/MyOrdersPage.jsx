import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaBox } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/axios";
import "../css/MyOrdersPage.css";

function MyOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to fetch your orders", err);
      }
    };

    fetchOrders();
  }, [token]);

  
if (!orders.length)
  return (
    <div className="empty-orders">
      <p>No orders found.</p>
    </div>
  );

return !orders.length ? (
  <div className="empty-orders">
    <FaBox style={{ fontSize: "2rem", opacity: 0.22, marginBottom: 12 }} />
    <p>No orders found.</p>
  </div>
) : (
  <div className="orders-container">
    <h2 className="orders-title">My Orders</h2>

    <div className="orders-table-wrapper">
      <table className="orders-table hide-mobile">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="orders-row" key={order._id}>
              <td className="order-id">#{order._id.slice(-6)}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="order-total">${order.totalPrice.toFixed(2)}</td>
              <td>
                {order.isPaid ? (
                  <span className="badge badge-paid">
                    <FaCheckCircle /> {order.paidAt.split("T")[0]}
                  </span>
                ) : (
                  <span className="badge badge-unpaid">
                    <FaTimesCircle /> Not Paid
                  </span>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  <span className="badge badge-delivered">
                    <FaCheckCircle /> {order.deliveredAt.split("T")[0]}
                  </span>
                ) : (
                  <span className="badge badge-pending">
                    <FaTimesCircle /> Not Delivered
                  </span>
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <button className="view-btn">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="orders-card-list show-mobile">
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-card-top">
            <span className="order-id">#{order._id.slice(-6)}</span>
            <span className="order-date">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="order-card-mid">
            <div>
              <span className="order-label">Total:</span>
              <span className="order-total">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="order-label">Paid:</span>
              {order.isPaid ? (
                <span className="badge badge-paid">
                  <FaCheckCircle /> {order.paidAt.split("T")[0]}
                </span>
              ) : (
                <span className="badge badge-unpaid">
                  <FaTimesCircle /> Not Paid
                </span>
              )}
            </div>
            <div>
              <span className="order-label">Delivered:</span>
              {order.isDelivered ? (
                <span className="badge badge-delivered">
                  <FaCheckCircle /> {order.deliveredAt.split("T")[0]}
                </span>
              ) : (
                <span className="badge badge-pending">
                  <FaTimesCircle /> Not Delivered
                </span>
              )}
            </div>
          </div>
          <div className="order-card-actions">
            <Link to={`/order/${order._id}`}>
              <button className="view-btn">Order Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default MyOrdersPage;
