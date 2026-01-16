import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SkipLink } from "./SkipLink";

export const Layout: React.FC = () => (
  <div className="site-shell">
    <SkipLink />
    <Navbar />
    <main id="main-content" className="site-main" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
