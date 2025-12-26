"use client";

import {
  Code2,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import Logo from "./logo";
import Link from "next/link";

export function Footer() {
  const socialMedia = [
    { href: "", icon: Github },
    { href: "", icon: Twitter },
    { href: "", icon: Linkedin },
    { href: "", icon: Instagram },
    { href: "", icon: Facebook },
  ];

  const servicesLinks = [
    { href: "", title: "Web Development" },
    { href: "", title: "Mobile Apps" },
    { href: "", title: "E-commerce" },
    { href: "", title: "UI/UX Design" },
    { href: "", title: "Graphic Design" },
  ];

  const quickLinks = [
    { href: "/services", title: "Services" },
    { href: "/about", title: "About Us" },
    { href: "/team", title: "Our Team" },
    { href: "/portfolio", title: "Portfolio" },
    { href: "/contact", title: "Contact" },
  ];

  return (
    <footer className="bg-[#023f78] text-[#ffffff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="-ml-3">
              <Link href={"/"}>
                <Logo />
              </Link>
            </div>
            <p className="text-[#ffffffCC] mb-4 text-pretty">
              Smart Web & Software Solutions.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((media) => (
                <Link
                  key={media.icon.name}
                  href={media.href}
                  className="text-[#ffffff99] hover:text-[#ffd83f] transition-colors"
                >
                  <media.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-[#ffffffCC] hover:text-[#ffd83f] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-[#ffffffCC] hover:text-[#ffd83f] transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#ffd83f]" />
                <span className="text-[#ffffffCC]">webify.af@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#ffd83f]" />
                <span className="text-[#ffffffCC]">+93 747 049 849</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#ffd83f]" />
                <span className="text-[#ffffffCC]">
                  Dasht-e-Barchi, Kabul, Afghanistan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ffffff33] mt-12 pt-8 text-center">
          <p className="text-[#ffffff99]">
            © 2025 Webify. All rights reserved. Built with passion and
            cutting-edge technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
