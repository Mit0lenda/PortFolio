import React, { useEffect } from "react";
import { useLanguage } from "../../app/LanguageProvider";
import { site } from "../../lib/site";

const setMetaTag = (key: string, content: string, attribute: "name" | "property" = "name") => {
  if (!content) {
    return;
  }
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setLinkTag = (rel: string, href: string) => {
  if (!href) {
    return;
  }
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const setJsonLd = (id: string, data?: object) => {
  const existing = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!data) {
    if (existing) {
      existing.remove();
    }
    return;
  }

  const element = existing ?? document.createElement("script");
  element.type = "application/ld+json";
  element.id = id;
  element.text = JSON.stringify(data);
  if (!existing) {
    document.head.appendChild(element);
  }
};

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object;
};

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
}) => {
  const { language } = useLanguage();
  const languageCode = language === "pt" ? "pt-BR" : "en";
  const absoluteUrl = new URL(path, site.url).toString();
  const imageUrl = new URL(image ?? site.ogImage, site.url).toString();

  useEffect(() => {
    document.title = title;
    setMetaTag("description", description);
    setMetaTag("robots", "index,follow");
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", type, "property");
    setMetaTag("og:url", absoluteUrl, "property");
    setMetaTag("og:site_name", site.name, "property");
    setMetaTag("og:image", imageUrl, "property");
    setMetaTag("og:locale", languageCode === "pt-BR" ? "pt_BR" : "en_US", "property");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", imageUrl);
    setLinkTag("canonical", absoluteUrl);

    const personJsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.developerName,
      url: site.url,
      email: site.email,
      sameAs: [site.linkedin, site.github],
    };

    const websiteJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      inLanguage: languageCode,
      publisher: {
        "@type": "Person",
        name: site.developerName,
      },
    };

    setJsonLd("ld-person", personJsonLd);
    setJsonLd("ld-website", websiteJsonLd);
    setJsonLd("ld-project", jsonLd);
  }, [title, description, absoluteUrl, imageUrl, type, jsonLd, languageCode]);

  return null;
};
