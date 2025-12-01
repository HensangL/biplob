import React, { useEffect, useState, useRef } from "react";
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
    background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.0))",
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
          <div>
            {feed.length > 3 ? (
              <div style={{ position: "relative" }}>
                <Carousel feed={feed} />
              </div>
            ) : (
              <div style={containerStyle}>
                {feed.map((item, i) => (
                  <Link
                    key={item._id || item.id || i}
                    to={`/social/${item._id || item.id || i}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={cardStyle}>
                      <div style={floatBtnStyle}>↗</div>
                      <div style={imageStyle(item.img)}></div>
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
        )}
      </div>
    </section>
  );
};

export default SocialFeed;

// ---------- Carousel Component ----------
function Carousel({ feed }) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(getVisibleCount());

  useEffect(() => {
    function onResize() {
      setVisible(getVisibleCount());
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, feed.length - visible);
    if (index > maxIndex) setIndex(maxIndex);
  }, [feed.length, visible]);

  const gap = 20;
  const percent = 100 / visible;

  const arrowBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.65)",
    color: "white",
    fontSize: "28px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    zIndex: 10,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    transition: "all 0.2s ease",
  };

  const disabledArrowStyle = {
    opacity: 0.3,
    cursor: "not-allowed",
  };

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setIndex((i) => Math.min(i + 1, Math.max(0, feed.length - visible)));
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label="Previous"
        onClick={prev}
        disabled={index <= 0}
        style={{
          ...arrowBtnStyle,
          left: "-10px",
          ...(index <= 0 ? disabledArrowStyle : {}),
        }}
      >
        ‹
      </button>

      <div style={{ overflow: "hidden" }} ref={containerRef}>
        <div
          style={{
            display: "flex",
            gap: gap + "px",
            transition: "transform 300ms ease",
            transform: `translateX(-${
              index *
              (percent +
                (gap / (containerRef.current ? containerRef.current.clientWidth : 1))) 
            }%)`,
          }}
        >
          {feed.map((item, i) => (
            <Link
              key={item._id || item.id || i}
              to={`/social/${item._id || item.id || i}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flex: `0 0 ${percent}%`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: 340,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "55%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {item.text && item.text.length > 120
                      ? item.text.slice(0, 120) + "…"
                      : item.text}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      opacity: 0.9,
                    }}
                  >
                    <span>{item.user}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        aria-label="Next"
        onClick={next}
        disabled={index >= Math.max(0, feed.length - visible)}
        style={{
          ...arrowBtnStyle,
          right: "-10px",
          ...(index >= Math.max(0, feed.length - visible) ? disabledArrowStyle : {}),
        }}
      >
        ›
      </button>
    </div>
  );
}

function getVisibleCount() {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (w < 600) return 1;
  if (w < 900) return 2;
  return 3;
}
