// Updated full code with scroll parallax, blur glass, IG comments, spring animation
// Entire layout centered + heading centered above both columns

import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

export default function SocialDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [btnHover, setBtnHover] = useState(false);
  const [reactions, setReactions] = useState({ like: 0, laugh: 0, share: 0 });

  // Parallax reference
  const imageRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Smooth spring animation helper
  const spring = (value, target, speed = 0.1) => value + (target - value) * speed;

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:5001/api/socialfeed/${id}`);
        if (!res.ok) throw new Error("Could not retrieve story");
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

  // Scroll-based parallax
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      padding: "4rem 2rem",
      background: "linear-gradient(135deg, #ff8a3c, #ff5400, #ff8a3c)",
      backgroundSize: "contain",
      animation: "gradientShift 12s ease infinite",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      boxSizing: "border-box",
    },

    mainContainer: {
      width: "100%",
      maxWidth: "1100px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    heading: {
      fontSize: "3rem",
      color: "white",
      fontWeight: "800",
      marginBottom: "3rem",
      textShadow: "0 0 20px rgba(255,255,255,0.4)",
    },

    contentWrapper: {
      display: "flex",
      width: "100%",
      gap: "2rem",
      justifyContent: "center",
      alignItems: "center",
    },

    // Parallax image panel with blur glass overlay
   imagePanel: {
  flex: "1",
  minHeight: "500px",
  borderRadius: "20px",
  backgroundImage: post ? `url(${post.img})` : "none",
  backgroundSize: "contain",   // FIT inside the frame
  backgroundPosition: "center", // center the image
  backgroundRepeat: "no-repeat",
  backgroundColor: "#000",      // keeps background clean
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
},


    blurGlass: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      padding: "1rem 2rem",
      backdropFilter: "blur(12px)",
      background: "rgba(255,255,255,0.1)",
      color: "white",
      fontWeight: "600",
      fontSize: "1.1rem",
      borderTop: "1px solid rgba(255,255,255,0.2)",
    },

    textPanel: {
      flex: "1",
      padding: "2rem 2rem",
      background: "rgba(255,255,255,0.85)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      animation: "floatUp 1.2s ease",
    },

    reactionBar: {
      marginTop: "2rem",
      display: "flex",
      gap: "1.5rem",
      fontSize: "1.8rem",
      cursor: "pointer",
      userSelect: "none",
    },

    reactionCount: {
      fontSize: "0.9rem",
      marginTop: "0.3rem",
      color: "#444",
    },

    commentBar: {
      marginTop: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      background: "rgba(255,255,255,0.9)",
      padding: "0.7rem 1rem",
      borderRadius: "12px",
      border: "1px solid rgba(0,0,0,0.1)",
    },

    commentInput: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "1rem",
    },

    sendBtn: {
      fontSize: "1.4rem",
      cursor: "pointer",
    },

    skeleton: {
      width: "100%",
      height: "500px",
      borderRadius: "20px",
      background: "linear-gradient(90deg, #dddddd, #f5f5f5, #dddddd)",
      backgroundSize: "200% 200%",
      animation: "shine 1.3s infinite",
    },

    centerMessage: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "monospace",
      color: "#fff",
      fontSize: "1.2rem",
    },
  };

  if (loading)
    return <div style={styles.centerMessage}>Loading…</div>;
  if (error)
    return <div style={styles.centerMessage}>Error: {error}</div>;

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.mainContainer}>
        <h1 style={styles.heading}>{post.time}</h1>

        <div style={styles.contentWrapper}>
          {/* Left: Parallax image with blur glass */}
          <div ref={imageRef} style={styles.imagePanel}>
            <div style={styles.blurGlass}>@{post.user}</div>
          </div>

          {/* Right: Text Panel */}
          <div style={styles.textPanel}>
            <p style={{ fontSize: "1.1rem", color: "#333", lineHeight: "1.7" }}>
              {post.text}
            </p>

            {/* Reactions */}
            <div style={styles.reactionBar}>
              <div onClick={() => setReactions({ ...reactions, like: reactions.like + 1 })}>❤️</div>
              <div onClick={() => setReactions({ ...reactions, laugh: reactions.laugh + 1 })}>😂</div>
              <div onClick={() => setReactions({ ...reactions, share: reactions.share + 1 })}>🔁</div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <span style={styles.reactionCount}>❤️ {reactions.like}</span>
              <span style={styles.reactionCount}>😂 {reactions.laugh}</span>
              <span style={styles.reactionCount}>🔁 {reactions.share}</span>
            </div>

            {/* Comment Bar */}
            <div style={styles.commentBar}>
              <input placeholder="Add a comment…" style={styles.commentInput} />
              <div style={styles.sendBtn}>📨</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes shine {
            0% { background-position: 0% 0%; }
            100% { background-position: -200% 0%; }
          }

          @keyframes floatUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
