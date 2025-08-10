import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../css/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/">ShopKar</Link>
        </div>

        <div
          className={`navbar__menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span><span></span><span></span>
        </div>

        <ul className={`navbar__links ${isMenuOpen ? "show" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/myorders">My Orders</Link></li>

          {user ? (
            <div className="navbar__user">
              <span className="navbar__username">Hi, {user.name}</span>
              <Link to="/profile">Profile</Link>
              <button className="navbar__logout-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
