import React, { useEffect, useState } from "react";

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
          <div className="feed-container">
            {feed.map((item, i) => (
              <div className="feed-item" key={i}>
                <div
                  className="feed-img"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div className="feed-content">
                  <p>{item.text}</p>
                  <div className="feed-meta">
                    <span>{item.user}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialFeed;
