import React from "react";

const Footer = () => (
  <footer id="contact">
    <div className="container">
      <div className="footer-content">
        <div className="footer-column">
          <h3>MusicHub</h3>
          <p>Connecting local music lovers with talented artists and exclusive merchandise.</p>
          <div className="social-icons">
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
            <a href="#">🎵</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#artists">Artists</a></li>
            <li><a href="#merch">Merchandise</a></li>
            <li><a href="#events">Events</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>Email: info@musichub.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Music Street, Sound City</li>
          </ul>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; 2023 MusicHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
