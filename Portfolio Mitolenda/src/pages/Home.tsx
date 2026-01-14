import React from "react";
import { Seo } from "../components/seo/Seo";
import { useCopy } from "../lib/useCopy";
import { SectionsRenderer } from "./SectionsRenderer";
import { routes } from "../lib/routes";

export const HomePage: React.FC = () => {
  const copy = useCopy();

  return (
    <>
      <Seo
        title={copy.seo.home.title}
        description={copy.seo.home.description}
        path={routes.home}
      />
      <SectionsRenderer variant="home" />
    </>
  );
};
