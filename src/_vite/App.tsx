import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../_pages/Home";
import { TermsPage } from "../_pages/TermsPage";
import { PrivacyPage } from "../_pages/PrivacyPage";

export const App: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/termos" element={<TermsPage />} />
      <Route path="/privacidade" element={<PrivacyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
