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
   <div className="cart-page">
     <h2 className="cart-title">Your Cart</h2>

     {cartItems.length === 0 ? (
       <div className="cart-empty">
         <p>
           Your cart is empty. <Link to="/">Go Shopping</Link>
         </p>
       </div>
     ) : (
       <>
         <div className="cart-list">
           {cartItems.map((item) => (
             <div className="cart-card card-hover" key={item._id}>
               <div className="cart-card-img">
                 <img src={item.image} alt={item.title || item.name} />
               </div>
               <div className="cart-card-info">
                 <h4 className="cart-item-title">{item.title || item.name}</h4>
                 <div className="cart-item-price">${item.price.toFixed(2)}</div>

                 <div className="cart-actions">
                   <label className="cart-qty-label">Qty:</label>
                   <select
                     className="cart-qty-select"
                     value={item.qty}
                     onChange={(e) =>
                       changeQuantity(item._id, Number(e.target.value))
                     }
                   >
                     {[...Array(item.countInStock || 10).keys()].map((x) => (
                       <option key={x + 1} value={x + 1}>
                         {x + 1}
                       </option>
                     ))}
                   </select>
                   <button
                     className="cart-remove-btn"
                     onClick={() => removeItem(item._id)}
                   >
                     Remove
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
         <div className="cart-summary">
           <h3 className="cart-summary-title">
             Subtotal: <span>${totalPrice.toFixed(2)}</span>
           </h3>
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

