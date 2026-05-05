import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);
