"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Smartphone,
  ShoppingCart,
  DatabaseIcon,
  Wrench,
  Palette,
  Clapperboard,
  Search,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

// Animation for individual cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Header animation
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const services = [
  {
    icon: Code,
    title: "Custom Website Development",
    description:
      "Tailored web solutions built from scratch using the latest technologies like React, Next.js, Express.js and Laravel. We create responsive, fast-loading websites that perfectly match your brand and business requirements.",
    features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Modern UI/UX"],
  },
  {
    icon: ShoppingCart,
    title: "eCommerce Solutions",
    description:
      "Complete online store development with secure payment processing, inventory management, and user-friendly shopping experiences. Perfect for businesses looking to sell products or services online.",
    features: ["Payment Integration", "Inventory Management", "Order Tracking", "Mobile Optimized"],
  },
  {
    icon: DatabaseIcon,
    title: "Hosting & Domain Setup",
    description:
      "Reliable cloud hosting solutions with 99.9% uptime guarantee. We handle domain registration, SSL certificates, and server configuration so you can focus on your business.",
    features: ["99.9% Uptime", "SSL Certificates", "Daily Backups", "CDN Integration"],
  },
  {
    icon: Wrench,
    title: "Website Maintenance & Optimization",
    description:
      "Ongoing support to keep your website secure, updated, and performing at its best. Regular updates, security patches, and performance optimizations included.",
    features: ["Security Updates", "Performance Monitoring", "Content Updates", "Bug Fixes"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that extend your web presence. Built with React Native and Flutter for optimal performance across all devices.",
    features: ["Cross-Platform", "Native Performance", "App Store Deployment", "Push Notifications"],
  },
  {
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Comprehensive SEO strategies and digital marketing campaigns to increase your online visibility and drive more qualified traffic to your website.",
    features: ["Keyword Research", "Content Strategy", "Link Building", "Analytics Reporting"],
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    description:
      "Professional graphic design services to create stunning visuals for your brand. From logos to marketing materials, we help you stand out in the digital landscape.",
    features: ["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics"],
  },
  {
    icon: Clapperboard,
    title: "Video Production & Editing",
    description:
      "High-quality video production and editing services to create engaging content for your audience. Perfect for promotional videos, tutorials, and social media content.",
    features: ["Promotional Videos", "Tutorials", "Social Media Content", "Post-Production Editing"],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 mt-10 sm:mt-20 bg-muted/30 dark:bg-[#0F172B]/30 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 px-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            Our <span className="text-secondary dark:text-[#ffd83f]">Services</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-[#e5e7eb] max-w-2xl mx-auto">
            We offer comprehensive web development services to help your business thrive in the digital world.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }} // triggers when 20% in view
              variants={cardVariants}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 flex flex-col bg-card dark:bg-[#1e293b]">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors dark:bg-[#374151]/20 dark:group-hover:bg-[#374151]/30">
                    <service.icon className="h-6 w-6 text-secondary dark:text-[#ffd83f]" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-foreground dark:text-white">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground dark:text-[#e5e7eb]">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground dark:text-[#e5e7eb]"
                      >
                        <div className="w-1.5 h-1.5 bg-accent dark:bg-[#ffd83f] rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
