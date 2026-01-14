import { useInView } from "react-intersection-observer";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const { ref, inView } = useInView({
    threshold: options.threshold ?? 0.2,
    rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
    triggerOnce: options.triggerOnce ?? true,
  });

  return { ref, isInView: inView };
};
