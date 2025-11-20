import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Styles
  const sectionStyle = {
    padding: "60px 0",
    background: "linear-gradient(135deg, #0e0e12 0%, #1a1a1f 100%)",
    fontFamily: "Poppins, sans-serif",
    color: "#fef4e8",
  };

  const containerStyle = {
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "2rem",
    fontWeight: "700",
    color: "#fef4e8",
    letterSpacing: "1px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  };

  const cardStyle = {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 6px 25px rgba(0,0,0,0.4)",
    transition: "all 0.4s ease",
    cursor: "pointer",
    position: "relative",
    background: "#000",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
  };

  const imgContainerStyle = {
    position: "relative",
    height: "320px",
    overflow: "hidden",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  };

  const overlayStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3), transparent)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };

  const dateStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(20, 20, 25, 0.9)",
    border: "1px solid rgba(255,215,0,0.4)",
    borderRadius: "8px",
    padding: "6px 10px",
    textAlign: "center",
    color: "#ffd700",
    fontWeight: "600",
    boxShadow: "0 0 10px rgba(255,215,0,0.15)",
  };

  const monthStyle = {
    display: "block",
    fontSize: "12px",
    letterSpacing: "0.5px",
  };

  const dayStyle = {
    fontSize: "16px",
    fontWeight: "700",
  };

  const titleCardStyle = {
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#fef4e8",
  };

  const descStyle = {
    fontSize: "0.9rem",
    lineHeight: "1.4",
    color: "#f5eadd",
  };

  const locationStyle = {
    marginTop: "8px",
    fontSize: "0.85rem",
    color: "#f8e5d2",
  };

  return (
    <section id="events" style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Upcoming Events</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "tomato" }}>{error}</p>
        ) : (
          <div style={gridStyle}>
            {events.map((e, i) => (
              <Link to={`/events/${e._id || e.id || i}`} key={e._id || i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  style={{
                    ...cardStyle,
                    ...(hoverIndex === i ? cardHoverStyle : {}),
                  }}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div style={imgContainerStyle}>
                    <img
                      src={e.poster}
                      alt={e.title}
                      style={{
                        ...imgStyle,
                        transform:
                          hoverIndex === i ? "scale(1.08)" : "scale(1)",
                      }}
                    />
                    <div style={overlayStyle}>
                      <h3 style={titleCardStyle}>{e.title}</h3>
                      <p style={descStyle}>{e.desc}</p>
                      <div style={locationStyle}>📍 {e.location}</div>
                    </div>
                    <div style={dateStyle}>
                      <span style={monthStyle}>{e.month}</span>
                      <span style={dayStyle}>{e.day}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
