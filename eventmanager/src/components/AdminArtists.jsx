import React, { useEffect, useState } from "react";

const AdminArtists = () => {
  const [artists, setArtists] = useState([]);
  const [form, setForm] = useState({ name: "", desc: "", img: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/artists")
      .then((res) => res.json())
      .then(setArtists)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    // TODO: POST to backend
    alert("POST endpoint not implemented yet");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin: Manage Artists</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="desc" value={form.desc} onChange={handleChange} placeholder="Description" required />
        <input name="img" value={form.img} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit">Add Artist</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((a, i) => (
              <tr key={i}>
                <td>{a.name}</td>
                <td>{a.desc}</td>
                <td><img src={a.img} alt={a.name} width={60} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminArtists;
