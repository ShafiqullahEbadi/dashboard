"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function HeroSection() {
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Use a numeric cubic-bezier array for `ease` so it matches the framer-motion Transition types
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="relative min-h-screen py-30 flex items-center justify-center 
      bg-gradient-to-br from-[#023f78] via-[#0254a1] to-[#023f78] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        className="container px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
          variants={fadeUp}
        >
          <span className="text-balance text-white">
            Transform Your Digital Presence with
          </span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-amber-300  bg-clip-text text-transparent">
            Expert Code
          </span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-[#ffffffcc] mb-8 max-w-2xl mx-auto text-pretty"
          variants={fadeUp}
        >
          We build modern, scalable websites and applications that drive
          results. From concept to deployment, we're your trusted development
          partner.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeUp}
        >
          <Button
            size="lg"
            className=" bg-gradient-to-r from-cyan-500 to-amber-300 text-white hover:bg-accent/90 font-semibold text-lg px-8 py-3"
          >
            <Link href={"/contact"}>Start Your Project</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/20 text-white hover:bg-primary-foreground/10 font-semibold text-lg px-8 py-3 bg-transparent"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Our Work
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-foreground/20"
          variants={fadeUp}
        >
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "5+", label: "Years Experience" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" variants={fadeUp}>
              <div className="text-3xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-[#ffffffb3]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
