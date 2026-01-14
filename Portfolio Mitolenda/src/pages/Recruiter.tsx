import React from "react";
import { Seo } from "../components/seo/Seo";
import { useCopy } from "../lib/useCopy";
import { SectionsRenderer } from "./SectionsRenderer";
import { routes } from "../lib/routes";

export const RecruiterPage: React.FC = () => {
  const copy = useCopy();

  return (
    <>
      <Seo
        title={copy.seo.recruiter.title}
        description={copy.seo.recruiter.description}
        path={routes.recruiter}
      />
      <SectionsRenderer variant="recruiter" />
    </>
  );
};
