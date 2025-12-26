"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import useGetProjects from "@/hooks/use-get-projects";
import { Project } from "@/types/project";
import { motion, Variants } from "framer-motion";

// Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export function PortfolioSection() {
  const { data, isLoading, isError } = useGetProjects();

  if (isLoading) {
    return (
      <section
        id="portfolio"
        className="py-20 mt-20 bg-white dark:bg-slate-900"
      >
        <div className="text-center text-slate-600 dark:text-slate-300">
          Loading projects...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        id="portfolio"
        className="py-20 mt-20 bg-white dark:bg-slate-900"
      >
        <div className="text-center text-red-500">
          Failed to load projects
        </div>
      </section>
    );
  }

  const projects = data || [];

  return (
    <section id="portfolio" className="py-20 mt-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Our <span className="text-secondary">Portfolio</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-pretty">
            Explore some of our recent projects that showcase our expertise and
            commitment to excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {projects.map((project: Project, index: number) => {
            const apiBase =
              process.env.NEXT_PUBLIC_API_BASE_URL ||
              "http://localhost:5000/api";
            const backendOrigin = apiBase.replace(/\/api\/?$/, "");
            let img = "/placeholder.svg";
            if (typeof project.image === "string" && project.image.length) {
              if (project.image.startsWith("http")) {
                img = project.image;
              } else {
                const rel = project.image.startsWith("/")
                  ? project.image
                  : `/${project.image}`;
                img = `${backendOrigin}${rel}`;
              }
            }

            return (
              <motion.div key={project._id || index} variants={fadeUp}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800">
                  <div className="relative overflow-hidden">
                    <img
                      src={img}
                      alt={project.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />

                    {/* Desktop Hover Overlay */}
                    <div className="hidden lg:flex absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                      {project.description}
                    </p>

                    {/* Always visible on mobile */}
                    <div className="flex lg:hidden mb-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map(
                        (tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
