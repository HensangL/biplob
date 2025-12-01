import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const Merch = () => {
  const [merchItems, setMerchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/merch")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch merch items");
        return res.json();
      })
      .then((data) => {
        setMerchItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ===== STYLES =====

  const styles = {
   section: {
  padding: "4rem 1rem",
  background: "#fff",
  textAlign: "center",
  marginTop: "px",   // <-- ADDED
},


    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      marginBottom: "2rem",
      color: "#FF4081",
      textShadow: "0px 0px 10px rgba(255,64,129,0.3)",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
      padding: "0 1rem",
    },

    card: {
      background: "white",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      transition: "transform .3s ease, box-shadow .3s ease",
      cursor: "pointer",
    },

    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
    },

    img: {
      width: "100%",
      height: "280px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "transform .4s ease",
    },

    cardText: {
      padding: "1.5rem",
      textAlign: "left",
    },

    name: {
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "0.4rem",
    },

    desc: {
      fontSize: "0.9rem",
      color: "#555",
      lineHeight: "1.5",
      marginBottom: "1rem",
    },

    price: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#FF4081",
      marginBottom: "1rem",
    },

    waBtn: {
      background: "#25D366",
      color: "white",
      padding: "0.6rem 1.4rem",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      width: "100%",
      transition: "background .3s ease, transform .2s ease",
    },

    waBtnHover: {
      background: "#1EBE5B",
      transform: "scale(1.05)",
    },

    // MOBILE: horizontal scroll carousel
    carousel: {
      display: "flex",
      overflowX: "scroll",
      padding: "1rem",
      gap: "1rem",
      scrollSnapType: "x mandatory",
    },

    carouselItem: {
      
      minWidth: "80%",
      scrollSnapAlign: "center",
      flexShrink: 0,
    },

  };

  // ===== RENDER =====

  if (loading) return <p style={{ textAlign: "center" }}>Loading…</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <section id="merch" style={styles.section}>
      <h2 style={styles.title}>Exclusive Merchandise</h2>

      {/* DESKTOP GRID OR CAROUSEL */}
      {merchItems.length > 3 ? (
        <Carousel
          items={merchItems}
          keyFor={(it, i) => it._id || it.id || i}
          renderItem={(item, i) => (
            <Link key={i} to={`/merch/${item._id || item.id || i}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="merch-card"
                style={styles.card}
                onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <div
                  style={{
                    ...styles.img,
                    backgroundImage: `url(${item.images?.[0] || item.img})`,
                  }}
                ></div>
                <div style={styles.cardText}>
                  <h3 style={styles.name}>{item.name}</h3>
                  <p style={styles.desc}>{item.desc}</p>
                  <div style={styles.price}>{item.price}</div>
                  <button
                    style={styles.waBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      const link = `https://wa.me/1234567890?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(item.name)}`;
                      window.open(link, "_blank");
                    }}
                  >
                    Buy on WhatsApp
                  </button>
                </div>
              </div>
            </Link>
          )}
        />
      ) : (
        <div className="desktop-grid" style={styles.grid}>
          {merchItems.map((item, i) => (
            <Link
              key={i}
              to={`/merch/${item._id || item.id || i}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="merch-card"
                style={styles.card}
                onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                {/* IMAGE */}
                <div
                  style={{
                    ...styles.img,
                    backgroundImage: `url(${item.images?.[0] || item.img})`,
                  }}
                ></div>

                {/* TEXT */}
                <div style={styles.cardText}>
                  <h3 style={styles.name}>{item.name}</h3>
                  <p style={styles.desc}>{item.desc}</p>
                  <div style={styles.price}>{item.price}</div>
                  
                  <button
                    style={styles.waBtn}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.waBtnHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.waBtn)}
                    onClick={(e) => {
                      e.preventDefault();
                      const link = `https://wa.me/1234567890?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(
                        item.name
                      )}`;
                      window.open(link, "_blank");
                    }}
                  >
                    Buy on WhatsApp
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* MOBILE CAROUSEL */}
      <div className="mobile-carousel" style={styles.carousel}>
        {merchItems.map((item, i) => (
          <Link
            key={i}
            to={`/merch/${item._id || item.id || i}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ ...styles.card, ...styles.carouselItem }}>
              <div
                style={{
                  ...styles.img,
                  backgroundImage: `url(${item.images?.[0] || item.img})`,
                }}
              ></div>
              <div style={styles.cardText}>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.desc}>{item.desc}</p>
                <div style={styles.price}>{item.price}</div>
                <button
                  style={styles.waBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    const link = `https://wa.me/1234567890?text=I'm interested in ${item.name}`;
                    window.open(link, "_blank");
                  }}
                >
                  Buy on WhatsApp
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* RESPONSIVE RULES */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-grid { display: none !important; }
          }
          @media (min-width: 769px) {
            .mobile-carousel { display: none !important; }
          }
        `}
      </style>
    </section>
  );
};

export default Merch;
