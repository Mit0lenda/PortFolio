import React from "react";
import { useLocation } from "react-router-dom";
import { Seo } from "../components/seo/Seo";
import { useCopy } from "../lib/useCopy";
import { routes } from "../lib/routes";
import { ButtonLink } from "../components/ui/ButtonLink";

export const NotFoundPage: React.FC = () => {
  const copy = useCopy();
  const { pathname } = useLocation();

  return (
    <section className="section not-found">
      <Seo
        title={copy.seo.notFound.title}
        description={copy.seo.notFound.description}
        path={pathname}
      />
      <div className="container not-found-content">
        <h1>{copy.seo.notFound.title}</h1>
        <p className="body-lg">{copy.seo.notFound.description}</p>
        <ButtonLink to={routes.home} variant="primary">
          {copy.nav.home}
        </ButtonLink>
      </div>
    </section>
  );
};
