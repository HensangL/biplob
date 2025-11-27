import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MerchDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`http://localhost:5001/api/merch/${id}`);
        if (!res.ok) throw new Error('Failed to fetch merch item');
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <section className="merch-detail container">
      <div className="merch-hero" style={{ backgroundImage: `url(${item.img})` }} aria-hidden="true" />
      <div className="merch-body">
        <h1>{item.name}</h1>
        <p className="price">{item.price}</p>
        <p>{item.desc}</p>
        <a
          href={`https://wa.me/1234567890?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(item.name)}`}
          className="btn buy-btn"
        >
          Buy on WhatsApp
        </a>
      </div>
    </section>
  );
}
