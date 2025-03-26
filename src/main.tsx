import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "@/pages/Home.tsx";
import AppLayout from "@/layout/AppLayout.tsx";
import Logs from "@/pages/Logs";
import Profile from "@/pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import Classification from "./pages/Classification";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<App />} />
          <Route path="/Logs" element={<Logs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
