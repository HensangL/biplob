import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="events">
      <div className="container">
        <div className="section-title">
          <h2>Upcoming Events</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="events-container">
            {events.map((e, i) => (
              <div className="event-card" key={i}>
                <div className="event-date">
                  <div className="day">{e.day}</div>
                  <div className="month">{e.month}</div>
                </div>
                <div className="event-details">
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                  <div className="event-location"><span>{e.location}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
