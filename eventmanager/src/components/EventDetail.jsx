import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
  fetch(`http://localhost:5001/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setEvent(data);
        setLoading(false);
        requestAnimationFrame(() => setVisible(true));
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const extractPlace = (loc) => {
    if (!loc) return null;
    const cleaned = loc.replace(/.*📍\s*/, "");
    return cleaned.split("-")[0].trim();
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: event.desc,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      }
    } catch (err) {
      alert("Share failed: " + err.message);
    }
  };

  const handleTwitter = () => {
    const text = `${event.title} - ${event.desc}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener");
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank", "noopener");
  };

  if (loading)
    return (
      <div style={{ padding: 40, color: "#ccc", textAlign: "center" }}>
        Loading...
      </div>
    );
  if (error)
    return (
      <div style={{ padding: 40, color: "red", textAlign: "center" }}>
        {error}
      </div>
    );
  if (!event) return null;

  const place = extractPlace(event.location);
  const mapSrc = place
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        place
      )}&output=embed`
    : null;

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0b0b0b, #1a1a1a 40%, #111)",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "Poppins, sans-serif",
        color: "#fdf5e6",
      }}
    >
      <div
        style={{
          maxWidth: 950,
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 400ms ease, transform 400ms ease",
        }}
      >
        {/* Breadcrumb Nav */}
        <nav
          style={{
            marginBottom: 30,
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(90deg, #1b1b1b, #000)",
            padding: "12px 18px",
            borderRadius: "10px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.4)",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#ff9f43",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
            onMouseLeave={(e) => (e.target.style.color = "#ff9f43")}
          >
            Home
          </Link>

          <span
            style={{
              margin: "0 10px",
              color: "#ffd700",
              fontWeight: "bold",
            }}
          >
            ›
          </span>

          <Link
            to="/"
            style={{
              color: "#ff9f43",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
            onMouseLeave={(e) => (e.target.style.color = "#ff9f43")}
          >
            Events
          </Link>

          <span
            style={{
              margin: "0 10px",
              color: "#ffd700",
              fontWeight: "bold",
            }}
          >
            ›
          </span>

          <span style={{ color: "#fff9dc", fontWeight: 600 }}>
            {event.title}
          </span>
        </nav>

        {/* Poster Section */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(180deg, #151515, #000)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
          }}
        >
          {event.poster && (
            <div style={{ height: 460, position: "relative" }}>
              <img
                src={event.poster}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.85)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px 30px",
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
                  color: "#fef4e8",
                }}
              >
                <h1 style={{ margin: 0, fontSize: 32, color: "#ffb84d" }}>
                  {event.title}
                </h1>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 15,
                    color: "#f3e8d2",
                  }}
                >
                  {event.day} {event.month} · {event.location}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ padding: 32 }}>
            <p style={{ lineHeight: 1.7, color: "#f5f5f5" }}>{event.desc}</p>

            {mapSrc && (
              <div style={{ marginTop: 28 }}>
                <h3
                  style={{
                    marginBottom: 10,
                    color: "#ffcc66",
                    letterSpacing: 0.3,
                  }}
                >
                  Location Map
                </h3>
                <div
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                  }}
                >
                  <iframe
                    title="event-location"
                    src={mapSrc}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 28,
              }}
            >
              <button
                onClick={handleShare}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "linear-gradient(90deg, #ff9f43, #ff6b35)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background =
                    "linear-gradient(90deg, #ffb84d, #ff8a3d)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background =
                    "linear-gradient(90deg, #ff9f43, #ff6b35)")
                }
              >
                Share
              </button>

              <button
                onClick={handleTwitter}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#1DA1F2",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Tweet
              </button>

              <button
                onClick={handleFacebook}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#4267B2",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Share on FB
              </button>

              {event.ticket && (
                <a
                  href={event.ticket}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      border: "none",
                      background: "#111",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Buy Tickets
                  </button>
                </a>
              )}

              <Link to="/" style={{ marginLeft: "auto", textDecoration: "none" }}>
                <button
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "transparent",
                    color: "#fef4e8",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ff9f43";
                    e.target.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#fef4e8";
                  }}
                >
                  Back to Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
