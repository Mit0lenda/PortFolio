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
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const basePath = getBasePath(pathname);
  const projectsHref = `${basePath}#projects`;
  const sitesHref = `${basePath}#sites`;
  const contactHref = `${basePath}#contact`;
  const isClient = pathname.startsWith(routes.client);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary">
        <Link to={routes.home} className="brand" aria-label={`${copy.brand.name} home`}>
          <span className="brand-name">{copy.brand.name}</span>
          <span className="brand-sub">{copy.brand.developerName}</span>
        </Link>
        <div className="nav-cta">
          <NavLink
            to={routes.client}
            className={`nav-client-btn ${isClient ? "is-active" : ""}`}
          >
            {copy.nav.client}
          </NavLink>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
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
          <Link to={sitesHref} className="nav-link">
            {stripHighlightTokens(copy.sites.title)}
          </Link>
          <Link to={contactHref} className="nav-link">
            {stripHighlightTokens(copy.contact.title)}
          </Link>
        </div>
        <div className="nav-actions nav-actions--desktop">
          <AudienceToggle />
          <LanguageSwitch />
        </div>
      </nav>
      <div className={`nav-drawer ${isMenuOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="nav-drawer-overlay"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div className="nav-drawer-panel" role="dialog" aria-modal="true">
          <div className="nav-drawer-header">
            <span className="nav-drawer-title">{copy.brand.name}</span>
            <button
              type="button"
              className="nav-drawer-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="nav-drawer-links" aria-label="Mobile">
            <NavLink to={routes.home} end className="nav-drawer-link" onClick={() => setMenuOpen(false)}>
              {copy.nav.home}
            </NavLink>
            <Link to={projectsHref} className="nav-drawer-link" onClick={() => setMenuOpen(false)}>
              {stripHighlightTokens(copy.projects.title)}
            </Link>
            <Link to={sitesHref} className="nav-drawer-link" onClick={() => setMenuOpen(false)}>
              {stripHighlightTokens(copy.sites.title)}
            </Link>
            <Link to={contactHref} className="nav-drawer-link" onClick={() => setMenuOpen(false)}>
              {stripHighlightTokens(copy.contact.title)}
            </Link>
            <NavLink to={routes.recruiter} className="nav-drawer-link" onClick={() => setMenuOpen(false)}>
              {copy.nav.recruiter}
            </NavLink>
          </nav>
          <div className="nav-drawer-footer">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};
