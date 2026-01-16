import React from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useCopy } from "../../lib/useCopy";
import { useScrollReveal } from "../../lib/useScrollReveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ButtonLink } from "../ui/ButtonLink";

const contactStyles = {
  LinkedIn: {
    icon: FaLinkedinIn,
    hoverBg: "rgba(255, 212, 0, 0.18)",
    accent: "rgba(255, 212, 0, 1)",
  },
  GitHub: {
    icon: FaGithub,
    hoverBg: "rgba(255, 59, 59, 0.18)",
    accent: "rgba(255, 59, 59, 1)",
  },
  Email: {
    icon: FaEnvelope,
    hoverBg: "rgba(255, 255, 255, 0.14)",
    accent: "rgba(255, 255, 255, 1)",
  },
  WhatsApp: {
    icon: FaWhatsapp,
    hoverBg: "rgba(37, 211, 102, 0.18)",
    accent: "rgba(37, 211, 102, 1)",
  },
  Instagram: {
    icon: FaInstagram,
    hoverBg: "rgba(255, 59, 59, 0.16)",
    accent: "rgba(255, 59, 59, 1)",
  },
};

export const ContactSection: React.FC = () => {
  const copy = useCopy();
  const { ref, isInView } = useScrollReveal();
  const baseItems = copy.contact.items;
  const whatsAppItem = baseItems.find((item) => item.label === "WhatsApp");
  const orderedItems = [
    ...(whatsAppItem ? [whatsAppItem] : []),
    ...baseItems.filter((item) => item.label !== "WhatsApp"),
  ];
  const primaryContact =
    orderedItems.find((item) => item.label === "WhatsApp") ??
    orderedItems.find((item) => item.label === "Email");

  return (
    <section ref={ref} className="section section--accent-primary section--contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-content">
          <SectionHeader
            title={copy.contact.title}
            intro={copy.contact.body}
            className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
          />
          {primaryContact ? (
            <div
              className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              <ButtonLink href={primaryContact.href} variant="primary" ripple>
                {copy.contact.ctaLabel}
              </ButtonLink>
            </div>
          ) : null}
        </div>
        <div className="contact-cards">
          {orderedItems.map((item, index) => {
            const isExternal = item.href.startsWith("http");
            const config = contactStyles[item.label as keyof typeof contactStyles];
            const Icon = config?.icon ?? FaEnvelope;

            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                className={`contact-item group reveal-on-scroll ${isInView ? "is-visible" : ""}`}
                style={
                  {
                    "--contact-hover-bg": config?.hoverBg ?? "rgba(255, 212, 0, 0.12)",
                    "--contact-accent": config?.accent ?? "var(--color-accent-primary)",
                    transitionDelay: `${index * 100}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="contact-icon transition-transform duration-300 ease-out group-hover:scale-[1.2]">
                  <Icon aria-hidden="true" focusable="false" />
                </span>
                <span className="contact-text">
                  <span className="contact-label">{item.label}</span>
                  {item.label === "WhatsApp" && item.value.includes("·") ? (
                    (() => {
                      const [number, note] = item.value.split("·").map((part) => part.trim());
                      return (
                        <>
                          <span className="contact-value transition-colors duration-300 ease-out">
                            {number}
                          </span>
                          <span className="contact-note">{note}</span>
                        </>
                      );
                    })()
                  ) : (
                    <span className="contact-value transition-colors duration-300 ease-out">
                      {item.value}
                    </span>
                  )}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
