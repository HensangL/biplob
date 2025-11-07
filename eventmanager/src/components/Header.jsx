import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <div className="container">
        <nav>
          <a href="#hero"  onClick={closeMenu}>
            <img src="/logo.png" className="logo-image" />
          </a>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="#hero" onClick={closeMenu}>Home</a>
            </li>
            <li>
              <a href="#artists" onClick={closeMenu}>Artists</a>
            </li>
            <li>
              <a href="#merch" onClick={closeMenu}>Merch</a>
            </li>
            <li>
              <a href="#events" onClick={closeMenu}>Events</a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </li>
            <li>
              <Link to="/admin" onClick={closeMenu}>Admin</Link>
            </li>
          </ul>
          <div className="mobile-menu" onClick={toggleMenu}>☰</div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
