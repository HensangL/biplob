import React, { useState } from "react";
import AdminLogin from "./Adminlogin";
import AdminArtists from "./AdminArtists";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <AdminArtists />
  ) : (
    <AdminLogin onLogin={() => setLoggedIn(true)} />
  );
};

export default AdminPage;
