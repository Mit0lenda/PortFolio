import React from "react";
import { Link } from "react-router-dom";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  external?: boolean;
  download?: boolean;
  className?: string;
  ripple?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  href,
  variant = "primary",
  external = false,
  download = false,
  className,
  ripple = false,
  onClick,
  children,
}) => {
  const classes = ["btn", `btn-${variant}`, ripple ? "btn-ripple" : "", className]
    .filter(Boolean)
    .join(" ");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (ripple) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const isKeyboard = event.clientX === 0 && event.clientY === 0;
      const x = isKeyboard ? rect.width / 2 : event.clientX - rect.left;
      const y = isKeyboard ? rect.height / 2 : event.clientY - rect.top;
      target.style.setProperty("--ripple-x", `${x}px`);
      target.style.setProperty("--ripple-y", `${y}px`);
      target.classList.remove("btn-ripple-active");
      void target.offsetWidth;
      target.classList.add("btn-ripple-active");
    }

    onClick?.(event);
  };

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        download={download ? "" : undefined}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={handleClick}>
      {children}
    </button>
  );
};
