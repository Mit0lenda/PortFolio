import React from "react";

type TechStackCardProps = {
  title: string;
  items: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  delayMs?: number;
};

export const TechStackCard: React.FC<TechStackCardProps> = ({
  title,
  items,
  icon: Icon,
  delayMs = 0,
}) => {
  return (
    <article
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[rgba(12,12,12,0.9)] p-6 text-[color:var(--color-text)] shadow-none transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:scale-[1.05] hover:border-[color:var(--color-accent-primary)] hover:bg-[rgba(18,18,18,0.95)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.55)] opacity-0 translate-y-4 animate-[fade-up_0.7s_ease_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:animate-none"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-white/5 text-[color:var(--color-accent-primary)] transition-colors duration-300 group-hover:border-[color:var(--color-accent-primary)] group-hover:text-[color:var(--color-accent-secondary)]">
          <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
        </span>
        <h3 className="m-0 text-lg font-semibold">{title}</h3>
      </div>
      <ul className="m-0 grid list-none gap-2 p-0 text-sm text-[color:var(--color-text-muted)]">
        {items.map((item) => (
          <li key={item} className="leading-snug">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};
