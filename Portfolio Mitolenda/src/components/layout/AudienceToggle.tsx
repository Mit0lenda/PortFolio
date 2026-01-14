import React from "react";
import { NavLink } from "react-router-dom";
import { useCopy } from "../../lib/useCopy";
import { routes } from "../../lib/routes";

export const AudienceToggle: React.FC = () => {
  const copy = useCopy();

  return (
    <div className="toggle-group" role="group" aria-label={copy.nav.audienceLabel}>
      <NavLink
        to={routes.recruiter}
        className={({ isActive }) =>
          `toggle-button ${isActive ? "is-active" : ""}`
        }
      >
        {copy.nav.recruiter}
      </NavLink>
      <NavLink
        to={routes.client}
        className={({ isActive }) => `toggle-button ${isActive ? "is-active" : ""}`}
      >
        {copy.nav.client}
      </NavLink>
    </div>
  );
};
