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
          <Link to="/" className="logo" onClick={closeMenu}>MusicHub</Link>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><Link to="/" className="logo" onClick={closeMenu} >Home</Link></li>

            <li><Link to="/artist" className="logo" onClick={closeMenu} >Artists</Link></li>
            <li><Link to="/merch" className="logo" onClick={closeMenu} >Merch</Link></li>
            <li><Link to="/events" className="logo" onClick={closeMenu} >Events</Link></li>
            <li><Link to="/contact" className="logo" onClick={closeMenu} >Contact</Link></li>
            <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
          </ul>
          <div className="mobile-menu" onClick={toggleMenu}>☰</div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
