import React from "react";
import { Seo } from "../components/seo/Seo";
import { useCopy } from "../lib/useCopy";
import { SectionsRenderer } from "./SectionsRenderer";
import { routes } from "../lib/routes";

export const ClientPage: React.FC = () => {
  const copy = useCopy();

  return (
    <>
      <Seo
        title={copy.seo.client.title}
        description={copy.seo.client.description}
        path={routes.client}
      />
      <SectionsRenderer variant="client" />
    </>
  );
};
