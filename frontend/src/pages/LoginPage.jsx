import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Register from "./RegisterPage";
import "../css/LoginPage.css";

function Login() {
  const { login } = useAuth(); // from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-com-0w79.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );
      const userData = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        isAdmin: res.data.isAdmin,
      };
      const token = res.data.token;

      console.log("Login response:", res.data);
      login(userData, token); // save to context + localStorage
      alert("Login successful");
      console.log("Navigating to /profile...");
      navigate("/profile"); // redirect to protected route
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
