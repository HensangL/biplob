import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SocialDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);

  // 📱 Detect mobile width
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:5001/api/socialfeed/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  useEffect(() => {
    async function fetchRelated() {
      setRelatedLoading(true);
      setRelatedError(null);
      try {
        const res = await fetch(`http://localhost:5001/api/socialfeed`);
        if (!res.ok) throw new Error(`Related fetch failed: ${res.status}`);
        const data = await res.json();
        const others = (data || []).filter((p) => (p._id || p.id) !== id);
        setRelated(others.slice(0, 6));
      } catch (err) {
        setRelatedError(err.message || String(err));
      } finally {
        setRelatedLoading(false);
      }
    }

    fetchRelated();
  }, [id]);

  const navigate = useNavigate();

  function handleBack() {
    try {
      if (window.history.length > 2) navigate(-1);
      else navigate('/#social');
    } catch (e) {
      // fallback to anchor
      window.location.href = '/#social';
    }
  }
  // 🔥 Styles updated for mobile overlay
  const styles = {
    page: {
      width: "100%",
      background: "#fff",
      fontFamily: "Inter, sans-serif",
      paddingBottom: "5rem",
    },

    heroWrapper: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      marginTop: "3rem",
      marginBottom: "4rem",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "2rem",
      alignItems: "stretch",
      position: "relative",
    },

    heroImage: {
      flex: isMobile ? "unset" : "2",
      width: "100%",
      borderRadius: isMobile ? "0px" : "3px",
      backgroundImage: post ? `url(${post.img})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: isMobile ? "420px" : "420px",
      position: "relative",
    },

    heroTextBox: {
      flex: isMobile ? "unset" : "1",
      background: isMobile ? "rgba(0,0,0,0.55)" : "#f7f7f7",
      padding: isMobile ? "2rem" : "3rem",
      borderRadius: isMobile ? "0px" : "3px",
      width: isMobile ? "85%" : "auto",
      color: isMobile ? "white" : "black",
      position: isMobile ? "absolute" : "relative",
      bottom: isMobile ? "20px" : "auto",
      left: isMobile ? "50%" : "auto",
      transform: isMobile ? "translateX(-50%)" : "none",
      backdropFilter: isMobile ? "blur(3px)" : "none",
      boxShadow: isMobile
        ? "0px 8px 20px rgba(0,0,0,0.4)"
        : "0 2px 10px rgba(0,0,0,0.07)",
    },

    meta: {
      fontSize: "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: isMobile ? "#ddd" : "#777",
      marginBottom: "1rem",
    },

    title: {
      fontSize: "1.9rem",
      fontWeight: "700",
      lineHeight: "1.3",
      marginBottom: "1.5rem",
      color: isMobile ? "white" : "#111",
    },

    text: {
      fontSize: "1rem",
      lineHeight: "1.7",
      color: isMobile ? "#eee" : "#444",
    },

    bottomEmptyArea: {
      width: "100%",
      maxWidth: "1200px",
      margin: "3rem auto",
      minHeight: "40px",
      borderTop: "1px solid #eee",
      paddingTop: "2rem",
      color: "#bbb",
      textAlign: "center",
      fontStyle: "italic",
    },
  };

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
        }}
      >
        Loading…
      </div>
    );

  if (error)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
        }}
      >
        Error: {error}
      </div>
    );

  if (!post)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
        }}
      >
        No content found.
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '1rem auto' }}>
        <button
          onClick={handleBack}
          className="detail-nav-btn"
          aria-label="Go back"
          style={{ marginBottom: 8 }}
        >
          ← Back
        </button>
      </div>

      {/* ---- HERO SECTION ---- */}
      <div style={styles.heroWrapper}>
        <div style={styles.heroImage}></div>

        <div style={styles.heroTextBox}>
          <div style={styles.meta}>
            {post.time} &nbsp; • &nbsp; @{post.user}
          </div>

          <div style={styles.title}>{post.text.slice(0, 50)}...</div>

          <div style={styles.text}>{post.text}</div>
        </div>
      </div>

      {/* ---- RELATED POSTS ---- */}
      <div style={{ width: "100%", maxWidth: 1200, margin: "2rem auto" }}>
        <h3 style={{ marginBottom: 12, color: "#222" }}>More from the feed</h3>

        {relatedLoading ? (
          <p>Loading related posts…</p>
        ) : relatedError ? (
          <p style={{ color: "red" }}>Error: {relatedError}</p>
        ) : related.length === 0 ? (
          <div style={styles.bottomEmptyArea}>No other posts found.</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {related.map((item, i) => (
              <Link
                key={item._id || item.id || i}
                to={`/social/${item._id || item.id || i}`}
                style={{ textDecoration: "none", color: "inherit" }}
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
                        opacity: 0.7,
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
        )}
      </div>
    </div>
  );
}
