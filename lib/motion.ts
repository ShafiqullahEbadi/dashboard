import type { Variants, Transition } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

const baseTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

const distanceMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
};

export const fadeIn = (direction: Direction = "up", distance = 32): Variants => {
  const offset = distanceMap[direction];

  return {
    hidden: {
      opacity: 0,
      x: offset.x ? Math.sign(offset.x) * distance : 0,
      y: offset.y ? Math.sign(offset.y) * distance : 0,
      filter: "blur(4px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: baseTransition,
    },
    exit: {
      opacity: 0,
      x: offset.x ? -Math.sign(offset.x) * distance : 0,
      y: offset.y ? -Math.sign(offset.y) * distance : 0,
      filter: "blur(6px)",
      transition: baseTransition,
    },
  };
};

export const stagger = (staggerChildren = 0.15, delayChildren = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ...baseTransition,
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(8px)",
    transition: baseTransition,
  },
};

export const floatY: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

