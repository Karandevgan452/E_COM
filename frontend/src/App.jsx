// src/App.jsx
import { BrowserRouter ,  Routes, Route } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CheckoutPage from "./pages/CheckoutPage";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import PrivateRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />

          {/* protected routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
         
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
