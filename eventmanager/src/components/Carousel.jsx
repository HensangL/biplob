import React, { useEffect, useRef, useState } from "react";

export default function Carousel({ items = [], renderItem, keyFor = (it, i) => it._id || it.id || i, gap = 20, ariaLabel = "Carousel" }) {
  const containerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(getVisibleCount());

  useEffect(() => {
    function onResize() {
      setVisible(getVisibleCount());
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = Math.max(1, Math.ceil(items.length / visible));

  useEffect(() => {
    // clamp page
    if (page >= pages) setPage(pages - 1);
  }, [pages]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const scrollTarget = c.clientWidth * page;
    c.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, [page, visible, items.length]);

  function prev() {
    setPage((p) => Math.max(0, p - 1));
  }

  function next() {
    setPage((p) => Math.min(p + 1, pages - 1));
  }

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label="Previous"
        className="carousel-btn left"
        onClick={prev}
        disabled={page <= 0}
        style={{ opacity: page <= 0 ? 0.35 : 1 }}
      >
        ‹
      </button>

      <div
        ref={containerRef}
        style={{ overflowX: "auto", scrollBehavior: "smooth" }}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="carousel-track"
      >
        <div
          style={{
            display: "flex",
            gap: gap + "px",
            padding: "8px 4px",
          }}
        >
          {items.map((it, i) => (
            <div key={keyFor(it, i)} style={{ flex: `0 0 ${100 / visible}%` }}>
              {renderItem(it, i)}
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Next"
        className="carousel-btn right"
        onClick={next}
        disabled={page >= pages - 1}
        style={{ opacity: page >= pages - 1 ? 0.35 : 1 }}
      >
        ›
      </button>

      {/* pagination dots */}
      <div className="carousel-dots" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
        {Array.from({ length: pages }).map((_, p) => (
          <button
            key={p}
            className={`carousel-dot ${p === page ? "active" : ""}`}
            aria-label={`Go to page ${p + 1}`}
            onClick={() => setPage(p)}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              border: "none",
              background: p === page ? "#FF6B35" : "#ddd",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function getVisibleCount() {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (w < 600) return 1;
  if (w < 900) return 2;
  return 3;
}
