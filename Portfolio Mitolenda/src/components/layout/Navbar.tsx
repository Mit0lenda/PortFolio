import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCopy } from "../../lib/useCopy";
import { routes } from "../../lib/routes";
import { stripHighlightTokens } from "../ui/HighlightText";
import { AudienceToggle } from "./AudienceToggle";
import { LanguageSwitch } from "./LanguageSwitch";

const getBasePath = (pathname: string): string => {
  if (pathname.startsWith(routes.recruiter)) {
    return routes.recruiter;
  }

  if (pathname.startsWith(routes.client)) {
    return routes.client;
  }

  return routes.home;
};

export const Navbar: React.FC = () => {
  const copy = useCopy();
  const { pathname } = useLocation();
  const basePath = getBasePath(pathname);
  const projectsHref = `${basePath}#projects`;
  const contactHref = `${basePath}#contact`;

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary">
        <Link to={routes.home} className="brand" aria-label={`${copy.brand.name} home`}>
          <span className="brand-name">{copy.brand.name}</span>
          <span className="brand-sub">{copy.brand.developerName}</span>
        </Link>
        <div className="nav-links">
          <NavLink
            to={routes.home}
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {copy.nav.home}
          </NavLink>
          <Link to={projectsHref} className="nav-link">
            {stripHighlightTokens(copy.projects.title)}
          </Link>
          <Link to={contactHref} className="nav-link">
            {stripHighlightTokens(copy.contact.title)}
          </Link>
        </div>
        <div className="nav-actions">
          <AudienceToggle />
          <LanguageSwitch />
        </div>
      </nav>
    </header>
  );
};
