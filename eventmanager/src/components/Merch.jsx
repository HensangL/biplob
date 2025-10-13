import React, { useEffect, useState } from "react";

const Merch = () => {
  const [merchItems, setMerchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section id="merch">
      <div className="container">
        <div className="section-title">
          <h2>Exclusive Merchandise</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="merch-grid">
            {merchItems.map((item, i) => (
              <div className="merch-item" key={i}>
                <div
                  className="merch-img"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div className="merch-info">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="price">{item.price}</div>
                  <a
                    href={`https://wa.me/1234567890?text=Hi,%20I'm%20interested%20in%20buying%20the%20${encodeURIComponent(
                      item.name
                    )}`}
                    className="whatsapp-btn"
                  >
                    Buy on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Merch;
