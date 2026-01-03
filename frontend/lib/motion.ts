import type { Variants } from "framer-motion";

export function fadeIn(
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 24
): Variants {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const sign = direction === "up" || direction === "left" ? 1 : -1;

  return {
    hidden: { opacity: 0, [axis]: sign * distance },
    show: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      [axis]: sign * distance,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  } as unknown as Variants;
}

export const simpleFade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};
