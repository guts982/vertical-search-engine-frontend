import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "@/pages/Home.tsx";
import AppLayout from "@/layout/AppLayout.tsx";
import Admin from "@/pages/Admin.tsx";
import Profile from "@/pages/Profile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
