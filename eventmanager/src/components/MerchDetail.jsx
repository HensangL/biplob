import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function MerchDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

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

  const images = (item && item.images && item.images.length)
    ? item.images
    : (item && item.img ? [item.img] : []);
  const count = images.length;

  function prev() {
    setIndex((i) => (count ? (i - 1 + count) % count : 0));
  }
  function next() {
    setIndex((i) => (count ? (i + 1) % count : 0));
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  if (loading) return <div style={{ textAlign: 'center', color: '#fff' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!item) return <div style={{ textAlign: 'center', color: '#fff' }}>Item not found</div>;

  return (
    <section className="merch-detail" style={{ background: '#111', color: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: '2px solid #ff9800',
            color: '#ff9800',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          ← Back
        </button>
        <Link
          to="/"
          style={{
            background: 'none',
            border: '2px solid #ff9800',
            color: '#ff9800',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Home
        </Link>
      </nav>

      <div
        className="merch-hero"
        style={{
          position: 'relative',
          width: '75%',
          maxHeight: '500px',
          backgroundImage: `url(${images[index] || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          margin: '2rem auto',
        }}
      >
        {count > 1 && (
          <>
            <button
              onClick={prev}
              style={carouselBtnStyle('left')}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={next}
              style={carouselBtnStyle('right')}
              aria-label="Next image"
            >
              ›
            </button>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              color: '#ff9800',
              background: 'rgba(0,0,0,0.5)',
              padding: '0.3rem 0.6rem',
              borderRadius: '12px',
              fontWeight: '600',
            }}>
              {index + 1} / {count}
            </div>
          </>
        )}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#ff9800', marginBottom: '1rem' }}>{item.name}</h1>
        <p style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{item.price}</p>
        <p style={{ color: '#ddd', lineHeight: '1.6', marginBottom: '2rem' }}>{item.desc}</p>
        <a
          href={`https://wa.me/1234567890?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(item.name)}`}
          style={{
            display: 'inline-block',
            background: '#14f005b1',
            color: '#ffffffff',
            padding: '0.8rem 2rem',
            borderRadius: '12px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Buy on WhatsApp
        </a>
      </div>
    </section>
  );
}

// Carousel button styles
function carouselBtnStyle(position) {
  return {
    position: 'absolute',
    top: '50%',
    [position]: '10px',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    color: '#25c102ff',
    fontSize: '2rem',
    fontWeight: 'bold',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    cursor: 'pointer',
  };
}
