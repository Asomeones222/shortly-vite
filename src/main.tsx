import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/reset.css";
import "./style/index.css";
import Home from "./Pages/Home.tsx";
if (!import.meta.env.VITE_WEBSITE_URL)
  throw new Error(
    "website url (VITE_WEBSITE_URL) is not defined in environment variables"
  );

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
