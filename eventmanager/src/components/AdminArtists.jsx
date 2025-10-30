import React, { useEffect, useState } from "react";
import "../admin.css";

const AdminPanel = () => {
  // Artists
  const [artists, setArtists] = useState([]);
  const [artistForm, setArtistForm] = useState({ name: "", desc: "", img: "" });
  // Merch
  const [merch, setMerch] = useState([]);
  const [merchForm, setMerchForm] = useState({ name: "", desc: "", price: "", img: "" });
  // Events
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ poster: "", day: "", month: "", title: "", desc: "", location: "" });
  // Social Feed
  const [feed, setFeed] = useState([]);
  const [feedForm, setFeedForm] = useState({ img: "", text: "", user: "", time: "" });

  // Loading/Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5001/api/artists").then(r => r.json()),
      fetch("http://localhost:5001/api/merch").then(r => r.json()),
      fetch("http://localhost:5001/api/events").then(r => r.json()),
      fetch("http://localhost:5001/api/socialfeed").then(r => r.json()),
    ]).then(([a, m, e, f]) => {
      setArtists(a);
      setMerch(m);
      setEvents(e);
      setFeed(f);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  // Handlers for forms (no POST yet)
  const handleArtistChange = e => setArtistForm({ ...artistForm, [e.target.name]: e.target.value });
  const handleMerchChange = e => setMerchForm({ ...merchForm, [e.target.name]: e.target.value });
  const handleEventChange = e => setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  const handleFeedChange = e => setFeedForm({ ...feedForm, [e.target.name]: e.target.value });

  const handleArtistAdd = e => { e.preventDefault(); alert("POST endpoint not implemented yet"); };
  const handleMerchAdd = e => { e.preventDefault(); alert("POST endpoint not implemented yet"); };
  const handleEventAdd = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });
      if (!res.ok) throw new Error("Failed to add event");
      const created = await res.json();
      setEvents(prev => [...prev, created]);
      setEventForm({ poster: "", day: "", month: "", title: "", desc: "", location: "" });
    } catch (err) {
      alert(err.message);
    }
  };
  const handleFeedAdd = e => { e.preventDefault(); alert("POST endpoint not implemented yet"); };

  // DELETE handlers
  const handleArtistDelete = async (index) => {
    if (!confirm('Delete this artist?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/artists/${index}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete artist');
      setArtists(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleMerchDelete = async (index) => {
    if (!confirm('Delete this merch item?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/merch/${index}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete merch');
      setMerch(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEventDelete = async (index) => {
    if (!confirm('Delete this event?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/events/${index}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      setEvents(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFeedDelete = async (index) => {
    if (!confirm('Delete this feed item?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/socialfeed/${index}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete feed item');
      setFeed(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="admin-panel"><p>Loading...</p></div>;
  if (error) return <div className="admin-panel"><p style={{ color: "red" }}>{error}</p></div>;

  return (
    <div className="admin-container">
      <nav className="sidebar">
        <li>
          <ul className="linkss"><a href="#artists">Artists</a> </ul>
          <ul className="linkss"><a href="#merchaa">Merch</a> </ul>
          <ul className="linkss"><a href="#events">Events</a> </ul>
          <ul className="linkss"><a href="#socials">Social Feed</a> </ul>
        </li>
      </nav>
    <div className="admin-panel">
      <h2>Admin: Manage All Data</h2>
      {/* Artists */}
      <section id="artists" style={{marginBottom:40}}>
        <h3>Artists</h3>
        <form className="admin-form" onSubmit={handleArtistAdd}>
          <input name="name" value={artistForm.name} onChange={handleArtistChange} placeholder="Name" required />
          <input name="desc" value={artistForm.desc} onChange={handleArtistChange} placeholder="Description" required />
          <input name="img" value={artistForm.img} onChange={handleArtistChange} placeholder="Image URL" required />
          <button type="submit">Add Artist</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Description</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>{artists.map((a,i)=>(
              <tr key={i}>
                <td>{a.name}</td>
                <td>{a.desc}</td>
                <td><img src={a.img} alt={a.name} width={60}/></td>
                <td><button onClick={()=>handleArtistDelete(i)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      {/* Merchaa */}
      <section id="merchaa" style={{marginBottom:40}}>
        <h3>Merch</h3>
        <form className="admin-form" onSubmit={handleMerchAdd}>
          <input name="name" value={merchForm.name} onChange={handleMerchChange} placeholder="Name" required />
          <input name="desc" value={merchForm.desc} onChange={handleMerchChange} placeholder="Description" required />
          <input name="price" value={merchForm.price} onChange={handleMerchChange} placeholder="Price" required />
          <input name="img" value={merchForm.img} onChange={handleMerchChange} placeholder="Image URL" required />
          <button type="submit">Add Merch</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Description</th><th>Price</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>{merch.map((m,i)=>(
              <tr key={i}>
                <td>{m.name}</td>
                <td>{m.desc}</td>
                <td>{m.price}</td>
                <td><img src={m.img} alt={m.name} width={60}/></td>
                <td><button onClick={()=>handleMerchDelete(i)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      {/* Events */}
      <section id="events" style={{marginBottom:40}}>
        <h3>Events</h3>
        <form className="admin-form" onSubmit={handleEventAdd}>
          <input name="poster" value={eventForm.poster} onChange={handleEventChange} placeholder="Poster Image URL" required />
          <input name="day" value={eventForm.day} onChange={handleEventChange} placeholder="Day" required style={{width:60}} />
          <input name="month" value={eventForm.month} onChange={handleEventChange} placeholder="Month" required style={{width:80}} />
          <input name="title" value={eventForm.title} onChange={handleEventChange} placeholder="Title" required />
          <input name="desc" value={eventForm.desc} onChange={handleEventChange} placeholder="Description" required />
          <input name="location" value={eventForm.location} onChange={handleEventChange} placeholder="Location" required />
          <button type="submit">Add Event</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Poster</th><th>Day</th><th>Month</th><th>Title</th><th>Description</th><th>Location</th><th>Actions</th></tr></thead>
            <tbody>{events.map((e,i)=>(
              <tr key={i}>
                <td>{e.poster ? <img src={e.poster} alt={e.title} width={60}/> : null}</td>
                <td>{e.day}</td>
                <td>{e.month}</td>
                <td>{e.title}</td>
                <td>{e.desc}</td>
                <td>{e.location}</td>
                <td><button onClick={()=>handleEventDelete(i)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      {/* Social Feed */}
      <section id="socials">
        <h3>Social Feed</h3>
        <form className="admin-form" onSubmit={handleFeedAdd}>
          <input name="img" value={feedForm.img} onChange={handleFeedChange} placeholder="Image URL" required />
          <input name="text" value={feedForm.text} onChange={handleFeedChange} placeholder="Text" required />
          <input name="user" value={feedForm.user} onChange={handleFeedChange} placeholder="User" required />
          <input name="time" value={feedForm.time} onChange={handleFeedChange} placeholder="Time" required />
          <button type="submit">Add Feed</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Text</th><th>User</th><th>Time</th><th>Actions</th></tr></thead>
            <tbody>{feed.map((f,i)=>(
              <tr key={i}>
                <td><img src={f.img} alt={f.user} width={60}/></td>
                <td>{f.text}</td>
                <td>{f.user}</td>
                <td>{f.time}</td>
                <td><button onClick={()=>handleFeedDelete(i)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </div>
    </div>
  );
};

export default AdminPanel;
