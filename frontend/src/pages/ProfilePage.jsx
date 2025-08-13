import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../css/ProfilePage.css";

function Profile() {
  const { user, token } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchOrders();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(
        "/users/profile",
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile", err);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <form onSubmit={handleUpdate} className="profile-form">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="New Password (optional)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update Profile</button>
        {message && <p className="message">{message}</p>}
      </form>

      <h3>My Orders</h3>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table>
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
                  <td>{order._id.slice(0, 6)}...</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Profile;
