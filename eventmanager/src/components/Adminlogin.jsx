import React, { useState, useMemo, useEffect } from "react";
import "./login.css";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary hardcoded login (you can change this)
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const localImages = useMemo(() => [
    
    '/Images/Main_Logo_Transparent.png'
  ], []);

  const [currentImage, setCurrentImage] = useState(() => {
    if (!localImages || localImages.length === 0) return null;
    const idx = Math.floor(Math.random() * localImages.length);
    return localImages[idx];
  });

  return (
    <div className="split-container">
      <main className="form-pane">
        <div className="login-box">
          <header className="login-head" aria-hidden>
            <div className="brand compact">
              <div className="brand-text">
                <h1>Welcome back</h1>
                <p className="subtitle">Login with your Admin account</p>
              </div>
            </div>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Email</label>
              <label className="field">
                <input
                  type="text"
                  placeholder="m@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="field-group password-row">
              <label className="field-label">Password</label>
              <label className="field">
                <input
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="actions">
              <button className="btn-primary" type="submit">Login</button>
            </div>
          </form>
        </div>
      </main>

      <aside
        className={`image-pane loaded`}
        style={currentImage ? { backgroundImage: `url(${currentImage})` } : undefined}
        aria-hidden
      >
        <div className="image-overlay" />
      </aside>
    </div>
  );
};

export default AdminLogin;