import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import BlueButton from "./blue-button";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE (slides in from left) */}
          <motion.div
            initial={{ translateX: "-50px", opacity: 0 }}
            whileInView={{ translateX: "0px", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-6">
              Why Choose <span className="text-secondary">Webify</span>?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl text-pretty">
              We're not just developers – we're your digital transformation partners. With years of experience and a
              passion for innovation, we deliver solutions that exceed expectations and drive real business results.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Expert team with 5+ years of experience",
                "Cutting-edge technologies and best practices",
                "Agile development methodology",
                "Transparent communication throughout the project",
                "Post-launch support and maintenance",
                "Competitive pricing with no hidden costs",
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <BlueButton text="Learn More About Us" href="/about" />
          </motion.div>

          {/* RIGHT SIDE (slides in from right) */}
          <motion.div
            initial={{ translateX: "50px", opacity: 0 }}
            whileInView={{ translateX: "0px", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border/50 text-center">
              <Users className="h-8 w-8 text-secondary mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-2">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Happy Clients</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border/50 text-center">
              <Award className="h-8 w-8 text-accent mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-2">15+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Awards Won</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border/50 text-center">
              <Clock className="h-8 w-8 text-destructive mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-2">99%</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">On-Time Delivery</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border/50 text-center">
              <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-2">150+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Projects Completed</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
