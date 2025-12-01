import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SocialFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/socialfeed")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch social feed");
        return res.json();
      })
      .then((data) => {
        setFeed(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ------- Card Styles (inline) ---------
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  };

  const cardStyle = {
    position: "relative",
    height: "370px",
    borderRadius: "22px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
  };

  const imageStyle = (img) => ({
    width: "100%",
    height: "100%",
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.92)",
  });

  const gradientStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "55%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.0))",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    color: "white",
  };

  const floatBtnStyle = {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "white",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.4",
    marginBottom: "10px",
    fontWeight: "500",
  };

  const metaStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    opacity: 0.85,
  };

  return (
    <section className="social-feed">
      <div className="container">
        <div className="section-title">
          <h2>From Our Community</h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div style={containerStyle}>
            {feed.map((item, i) => (
              <Link
                key={item._id || item.id || i}
                to={`/social/${item._id || item.id || i}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={cardStyle}>
                  {/* Floating button */}
                  <div style={floatBtnStyle}>↗</div>

                  {/* Background image */}
                  <div style={imageStyle(item.img)}></div>

                  {/* Gradient + content */}
                  <div style={gradientStyle}>
                    <p style={textStyle}>{item.text}</p>

                    <div style={metaStyle}>
                      <span>{item.user}</span>
                      <span>{item.time}</span>
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

export default SocialFeed;
