import React, { useEffect, useState } from "react";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/artists")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artists");
        return res.json();
      })
      .then((data) => {
        setArtists(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="artists">
      <div className="container">
        <div className="section-title">
          <h2>Featured Artists</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="artists-grid">
            {artists.map((artist, i) => (
              <div className="artist-card" key={i}>
                <div
                  className="artist-img"
                  style={{ backgroundImage: `url(${artist.img})` }}
                ></div>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <p>{artist.desc}</p>
                  <div className="social-links">
                    <a href="#">♬</a>
                    <a href="#">📷</a>
                    <a href="#">📘</a>
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

export default Artists;
