import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const savedShipping = localStorage.getItem("shippingAddress");
    if (savedShipping) {
      setFormData(JSON.parse(savedShipping));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
    navigate("/placeorder");
  };

  return (
    <div className="checkout-container">
      <h2>Shipping Address</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
