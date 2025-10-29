import React from "react";
import { Routes, Route } from "react-router-dom";
import MainSite from "./Mainsite";
import AdminPage from "./Adminpage";
import EventDetail from "./EventDetail";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/events/:index" element={<EventDetail />} />
      {/* Optional: 404 page (if you want) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
