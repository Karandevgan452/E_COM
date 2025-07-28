// src/components/Footer.jsx
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} YourShop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
