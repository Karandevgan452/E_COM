import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/CartPage.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const changeQuantity = (id, qty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, qty } : item
    );
    updateCart(updated);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      changeQuantity(item._id, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeItem(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

