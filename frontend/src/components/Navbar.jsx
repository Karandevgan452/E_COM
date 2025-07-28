// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Navbar.css";

function Navbar() {
    const {user , logout} = useAuth(); // from AuthContext
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">ShopKar</Link>
      </div>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
         <li>
          <Link to="/myorders">View My Orders</Link>
        </li>
        <li>
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </li>
        {/* <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
