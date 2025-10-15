import React from "react";
import { Routes, Route } from "react-router-dom";
import MainSite from "./Mainsite";
import AdminPage from "./Adminpage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin" element={<AdminPage />} />
      {/* Optional: 404 page (if you want) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
