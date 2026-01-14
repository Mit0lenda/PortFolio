export const routes = {
  home: "/",
  recruiter: "/recruiter",
  client: "/client",
  project: (slug: string) => `/projects/${slug}`,
};
