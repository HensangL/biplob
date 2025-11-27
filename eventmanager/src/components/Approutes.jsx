import React from "react";
import { Routes, Route } from "react-router-dom";
import MainSite from "./Mainsite";
import AdminPage from "./Adminpage";
import EventDetail from "./EventDetail";
import MerchDetail from "./MerchDetail";
import SocialDetail from "./SocialDetail";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/events/:id" element={<EventDetail />} />
  <Route path="/merch/:id" element={<MerchDetail />} />
  <Route path="/social/:id" element={<SocialDetail />} />
      {/* Optional: 404 page (if you want) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
