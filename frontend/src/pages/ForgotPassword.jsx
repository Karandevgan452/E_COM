import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import "../css/AuthPages.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("/users/forgot-password", { email });
      setMessage(response.data.message);
      toast.success("Password reset link sent to your email!");
      setEmail("");
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Forgot Password</h2>
        <p style={{ textAlign: "center", marginBottom: "1rem", color: "#666" }}>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <div
            className="auth-message"
            style={{
              background: "#e8f5e8",
              color: "#2d5a2d",
              border: "1px solid #c3e6c3",
            }}
          >
            {message}
          </div>
        )}

        {error && <div className="auth-message error">{error}</div>}

        <p>
          <Link to="/login">← Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
