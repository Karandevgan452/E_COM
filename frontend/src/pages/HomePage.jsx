import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBoxOpen,
  FaSmile,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import API from "../api/axios";
import "../css/HomePage.css";

function HomePage() {
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
        setTrending(res.data.slice(0, 3));
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetchProducts();
  }, []);
  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterMsg("Thank you for subscribing!");
    setTimeout(() => setNewsletterMsg(""), 3000);
  };

  return (
    <div className="landing-container">
      <header className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">Welcome to ShopKar</span>
            </h1>
            <p className="hero-subtitle">
              Discover the best products at unbeatable prices
            </p>
            <Link to="/shop" className="shop-btn">
              <span className="btn-text">Shop Now</span>
              <div className="btn-shine"></div>
            </Link>
          </div>
          <div className="hero-decoration">
            <div className="floating-element floating-1"></div>
            <div className="floating-element floating-2"></div>
            <div className="floating-element floating-3"></div>
          </div>
        </div>
        <div className="hero-wave"></div>
      </header>

      <div className="cta-banner">
        <span>
          Sign up now and get <b>10% OFF</b> your first order!
        </span>
        <Link to="/register" className="cta-btn">
          Register
        </Link>
      </div>

      <section className="trending">
        <div className="section-header">
          <h2 className="section-title">Trending Products</h2>
          <div className="section-line"></div>
        </div>
        <div className="trending-grid">
          {trending.map((prod) => (
            <div
              className="trending-card card-hover"
              key={prod._id}
              tabIndex={0}
            >
              <img src={prod.image} alt={prod.name} className="trending-img" />
              <div className="trending-info">
                <h4>{prod.title}</h4>
                <span className="trending-price">₹{prod.price}</span>
                <Link to={`/product/${prod._id}`} className="trending-view-btn">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <div className="section-line"></div>
        </div>
        <div className="how-steps">
          <div className="how-step card-hover" tabIndex={0}>
            <FaSearch className="how-icon" />
            <h4>Browse</h4>
            <p>Explore our wide range of products.</p>
          </div>
          <div className="how-step card-hover" tabIndex={0}>
            <FaBoxOpen className="how-icon" />
            <h4>Order</h4>
            <p>Place your order in a few clicks.</p>
          </div>
          <div className="how-step card-hover" tabIndex={0}>
            <FaSmile className="how-icon" />
            <h4>Enjoy</h4>
            <p>Fast delivery and top-notch support.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Why Choose ShopKar</h2>
          <div className="section-line"></div>
        </div>
        <div className="features-grid">
          <div className="feature card-hover" tabIndex={0}>
            <div className="feature-icon">🚚</div>
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered within 48 hours anywhere in India.</p>
            <div className="feature-glow"></div>
          </div>
          <div className="feature card-hover" tabIndex={0}>
            <div className="feature-icon">🔐</div>
            <h3>Secure Payments</h3>
            <p>
              Pay confidently with Stripe, Razorpay, and PayPal integration.
            </p>
            <div className="feature-glow"></div>
          </div>
          <div className="feature card-hover" tabIndex={0}>
            <div className="feature-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Our friendly support team is here for you anytime.</p>
            <div className="feature-glow"></div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="section-header">
          <h2 className="section-title">Popular Categories</h2>
          <div className="section-line"></div>
        </div>
        <div className="category-grid">
          <div className="category-card card-hover" tabIndex={0}>
            <div className="category-content">
              <span className="category-text">Electronics</span>
              <div className="category-overlay"></div>
            </div>
          </div>
          <div className="category-card card-hover" tabIndex={0}>
            <div className="category-content">
              <span className="category-text">Fashion</span>
              <div className="category-overlay"></div>
            </div>
          </div>
          <div className="category-card card-hover" tabIndex={0}>
            <div className="category-content">
              <span className="category-text">Home & Kitchen</span>
              <div className="category-overlay"></div>
            </div>
          </div>
          <div className="category-card card-hover" tabIndex={0}>
            <div className="category-content">
              <span className="category-text">Beauty</span>
              <div className="category-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="section-line"></div>
        </div>
        <div className="testimonial-grid">
          <blockquote className="testimonial-card card-hover" tabIndex={0}>
            <div className="quote-mark">"</div>
            <p>"Amazing quality and fast delivery. I'm impressed!"</p>
            <cite>– Aditi S.</cite>
            <div className="testimonial-glow"></div>
          </blockquote>
          <blockquote className="testimonial-card card-hover" tabIndex={0}>
            <div className="quote-mark">"</div>
            <p>"Customer service is top-notch. Highly recommend!"</p>
            <cite>– Rahul K.</cite>
            <div className="testimonial-glow"></div>
          </blockquote>
          <blockquote className="testimonial-card card-hover" tabIndex={0}>
            <div className="quote-mark">"</div>
            <p>"Wide variety of products. Great experience overall."</p>
            <cite>– Neha P.</cite>
            <div className="testimonial-glow"></div>
          </blockquote>
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-subtitle">
              Subscribe to get the latest updates, offers, and more.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <span>Subscribe</span>
                  <div className="btn-arrow">→</div>
                </button>
              </div>
              <div className="newsletter-privacy">
                No spam, unsubscribe anytime.
              </div>
              {newsletterMsg && (
                <div className="newsletter-success">{newsletterMsg}</div>
              )}
            </form>
          </div>
          <div className="newsletter-decoration">
            <div className="newsletter-circle circle-1"></div>
            <div className="newsletter-circle circle-2"></div>
            <div className="newsletter-circle circle-3"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
