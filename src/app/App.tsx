import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ScrollToTop } from "../components/ui/ScrollToTop";
import { HomePage } from "../pages/Home";
import { RecruiterPage } from "../pages/Recruiter";
import { ClientPage } from "../pages/Client";
import { ProjectDetailsPage } from "../pages/ProjectDetails";
import { NotFoundPage } from "../pages/NotFound";

export const App: React.FC = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
);
