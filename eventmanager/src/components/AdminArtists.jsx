import React, { useEffect, useState } from "react";
import "../admin.css";

const AdminPanel = () => {
  // Artists
  const [artists, setArtists] = useState([]);
  const [artistForm, setArtistForm] = useState({ name: "", desc: "", img: "", instagram: "" });
  const [artistFile, setArtistFile] = useState(null);
  const [artistPreview, setArtistPreview] = useState(null);
  // Merch
  const [merch, setMerch] = useState([]);
  const [merchForm, setMerchForm] = useState({ name: "", desc: "", price: "", img: "" });
  const [merchFile, setMerchFile] = useState(null);
  const [merchPreview, setMerchPreview] = useState(null);
  // Events
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ poster: "", day: "", month: "", title: "", desc: "", location: "", ticket: "" });
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  // Social Feed
  const [feed, setFeed] = useState([]);
  const [feedForm, setFeedForm] = useState({ img: "", text: "", user: "", time: "" });
  const [feedFile, setFeedFile] = useState(null);
  const [feedPreview, setFeedPreview] = useState(null);

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
  const handleEventFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setPosterFile(f || null);
    setPosterPreview(f ? URL.createObjectURL(f) : null);
  };
  const handleFeedChange = e => setFeedForm({ ...feedForm, [e.target.name]: e.target.value });

  const handleArtistFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setArtistFile(f || null);
    setArtistPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleMerchFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setMerchFile(f || null);
    setMerchPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleFeedFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFeedFile(f || null);
    setFeedPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleArtistAdd = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = artistForm.img;
      if (artistFile) {
        const fd = new FormData();
        fd.append('file', artistFile);
        const up = await fetch('http://localhost:5001/api/upload', { method: 'POST', body: fd });
        if (!up.ok) throw new Error('Image upload failed');
        const j = await up.json();
        imgUrl = `http://localhost:5001${j.url}`;
      }
      const payload = { ...artistForm, img: imgUrl };
      const res = await fetch("http://localhost:5001/api/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to add artist');
      }
      const created = await res.json();
      setArtists((prev) => [created, ...prev]);
      setArtistForm({ name: "", desc: "", img: "" });
      setArtistFile(null);
      if (artistPreview) { URL.revokeObjectURL(artistPreview); setArtistPreview(null); }
    } catch (err) {
      alert(err.message || "Failed to add artist");
    }
  };

  const handleMerchAdd = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = merchForm.img;
      if (merchFile) {
        const fd = new FormData();
        fd.append('file', merchFile);
        const up = await fetch('http://localhost:5001/api/upload', { method: 'POST', body: fd });
        if (!up.ok) throw new Error('Image upload failed');
        const j = await up.json();
        imgUrl = `http://localhost:5001${j.url}`;
      }
      const payload = { ...merchForm, img: imgUrl };
      const res = await fetch("http://localhost:5001/api/merch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to add merch');
      }
      const created = await res.json();
      setMerch((prev) => [created, ...prev]);
      setMerchForm({ name: "", desc: "", price: "", img: "" });
      setMerchFile(null);
      if (merchPreview) { URL.revokeObjectURL(merchPreview); setMerchPreview(null); }
    } catch (err) {
      alert(err.message || "Failed to add merch");
    }
  };
  const handleEventAdd = async e => {
    e.preventDefault();
    try {
      let posterUrl = eventForm.poster;
      // If user selected a file, upload it first
      if (posterFile) {
        const fd = new FormData();
        fd.append('file', posterFile);
        const up = await fetch('http://localhost:5001/api/upload', { method: 'POST', body: fd });
        if (!up.ok) throw new Error('Image upload failed');
        const j = await up.json();
        // j.url is relative (/uploads/...) so prefix with backend origin
        posterUrl = `http://localhost:5001${j.url}`;
      }

      const payload = { ...eventForm, poster: posterUrl };
      const res = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to add event');
      }
      const created = await res.json();
      setEvents(prev => [created, ...prev]);
      setEventForm({ poster: "", day: "", month: "", title: "", desc: "", location: "", ticket: "" });
      setPosterFile(null);
      setPosterPreview(null);
    } catch (err) {
      alert(err.message || 'Failed to add event');
    }
  };
  const handleFeedAdd = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = feedForm.img;
      if (feedFile) {
        const fd = new FormData();
        fd.append('file', feedFile);
        const up = await fetch('http://localhost:5001/api/upload', { method: 'POST', body: fd });
        if (!up.ok) throw new Error('Image upload failed');
        const j = await up.json();
        imgUrl = `http://localhost:5001${j.url}`;
      }
      const payload = { ...feedForm, img: imgUrl };
      const res = await fetch("http://localhost:5001/api/socialfeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to add feed item');
      }
      const created = await res.json();
      setFeed((prev) => [created, ...prev]);
      setFeedForm({ img: "", text: "", user: "", time: "" });
      setFeedFile(null);
      if (feedPreview) { URL.revokeObjectURL(feedPreview); setFeedPreview(null); }
    } catch (err) {
      alert(err.message || "Failed to add feed item");
    }
  };

  // DELETE handlers
  const handleArtistDelete = async (id) => {
    if (!confirm('Delete this artist?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/artists/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete artist');
      setArtists(prev => prev.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleMerchDelete = async (id) => {
    if (!confirm('Delete this merch item?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/merch/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete merch');
      setMerch(prev => prev.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEventDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      setEvents(prev => prev.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFeedDelete = async (id) => {
    if (!confirm('Delete this feed item?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/socialfeed/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete feed item');
      setFeed(prev => prev.filter(item => (item._id || item.id) !== id));
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
          <input name="img" value={artistForm.img} onChange={handleArtistChange} placeholder="Image URL (or upload below)" />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="file" accept="image/*" onChange={handleArtistFileChange} />
            {artistPreview && <img src={artistPreview} alt="preview" style={{ height: 48, borderRadius: 6 }} />}
          </div>
          <button type="submit">Add Artist</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Description</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>{artists.map((a)=>(
              <tr key={a._id || a.id}>
                <td>{a.name}</td>
                <td>{a.desc}</td>
                <td><img src={a.img} alt={a.name} width={60}/></td>
                <td><button onClick={()=>handleArtistDelete(a._id || a.id)}>Delete</button></td>
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
          <input name="img" value={merchForm.img} onChange={handleMerchChange} placeholder="Image URL (or upload below)" />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="file" accept="image/*" onChange={handleMerchFileChange} />
            {merchPreview && <img src={merchPreview} alt="preview" style={{ height: 48, borderRadius: 6 }} />}
          </div>
          <button type="submit">Add Merch</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Description</th><th>Price</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>{merch.map((m)=>(
              <tr key={m._id || m.id}>
                <td>{m.name}</td>
                <td>{m.desc}</td>
                <td>{m.price}</td>
                <td><img src={m.img} alt={m.name} width={60}/></td>
                <td><button onClick={()=>handleMerchDelete(m._id || m.id)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      {/* Events */}
      <section id="events" style={{marginBottom:40}}>
        <h3>Events</h3>
        <form className="admin-form" onSubmit={handleEventAdd}>
          <input name="poster" value={eventForm.poster} onChange={handleEventChange} placeholder="Poster Image URL (or upload below)" />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="file" accept="image/*" onChange={handleEventFileChange} />
            {posterPreview && <img src={posterPreview} alt="preview" style={{ height: 48, borderRadius: 6 }} />}
          </div>
          <input name="day" value={eventForm.day} onChange={handleEventChange} placeholder="Day" required style={{width:60}} />
          <input name="month" value={eventForm.month} onChange={handleEventChange} placeholder="Month" required style={{width:80}} />
          <input name="title" value={eventForm.title} onChange={handleEventChange} placeholder="Title" required />
          <input name="desc" value={eventForm.desc} onChange={handleEventChange} placeholder="Description" required />
          <input name="location" value={eventForm.location} onChange={handleEventChange} placeholder="Location" required />
          <input name="ticket" value={eventForm.ticket} onChange={handleEventChange} placeholder="Ticket URL (optional)" />
          <button type="submit">Add Event</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Poster</th><th>Day</th><th>Month</th><th>Title</th><th>Description</th><th>Location</th><th>Ticket</th><th>Actions</th></tr></thead>
            <tbody>{events.map((e)=>(
              <tr key={e._id || e.id}>
                <td>{e.poster ? <img src={e.poster} alt={e.title} width={60}/> : null}</td>
                <td>{e.day}</td>
                <td>{e.month}</td>
                <td>{e.title}</td>
                <td>{e.desc}</td>
                <td>{e.location}</td>
                <td>{e.ticket ? <a href={e.ticket} target="_blank" rel="noopener noreferrer">Link</a> : '-'}</td>
                <td><button onClick={()=>handleEventDelete(e._id || e.id)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      {/* Social Feed */}
      <section id="socials">
        <h3>Social Feed</h3>
        <form className="admin-form" onSubmit={handleFeedAdd}>
          <input name="img" value={feedForm.img} onChange={handleFeedChange} placeholder="Image URL (or upload below)" />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="file" accept="image/*" onChange={handleFeedFileChange} />
            {feedPreview && <img src={feedPreview} alt="preview" style={{ height: 48, borderRadius: 6 }} />}
          </div>
          <input name="text" value={feedForm.text} onChange={handleFeedChange} placeholder="Text" required />
          <input name="user" value={feedForm.user} onChange={handleFeedChange} placeholder="User" required />
          <input name="time" value={feedForm.time} onChange={handleFeedChange} placeholder="Time" required />
          <button type="submit">Add Feed</button>
        </form>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Text</th><th>User</th><th>Time</th><th>Actions</th></tr></thead>
            <tbody>{feed.map((f)=>(
              <tr key={f._id || f.id}>
                <td><img src={f.img} alt={f.user} width={60}/></td>
                <td>{f.text}</td>
                <td>{f.user}</td>
                <td>{f.time}</td>
                <td><button onClick={()=>handleFeedDelete(f._id || f.id)}>Delete</button></td>
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
