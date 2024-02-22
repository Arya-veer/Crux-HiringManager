import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { ResumePage } from "./pages/ResumePage";
import UploadResume from "./pages/UploadResume";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:static_id" element={<ResumePage />} />
        <Route path="/resume/upload/:static_id" element={<UploadResume />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
);
