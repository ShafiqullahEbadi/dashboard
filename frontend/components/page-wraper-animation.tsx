"use client";

import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { fadeIn } from "@/lib/motion";

const pageVariants = fadeIn("up", 48);

export default function PageWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="min-h-screen will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
