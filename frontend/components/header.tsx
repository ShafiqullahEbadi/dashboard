"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#023f78F2] backdrop-blur-sm border-b border-[#023f7833]">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
            {["Home", "Services", "About", "Team", "Portfolio", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="text-[#ffffffCC] hover:text-[#ffd83f] transition-colors text-sm lg:text-base"
                >
                  {item}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button + Theme Toggle */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
              <ThemeToggle />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm sm:text-base px-3 sm:px-5">
                <Link href={"/contact"}>Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#ffffffCC]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#023f7833] animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {[
                "Home",
                "Services",
                "About",
                "Team",
                "Portfolio",
                "Contact",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="text-[#ffffffCC] hover:text-[#ffd83f] transition-colors text-sm sm:text-base"
                >
                  {item}
                </Link>
              ))}
              <div className="flex items-center space-x-3 pt-2">
                <ThemeToggle />
                <Link href={"/contact"}>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm sm:text-base w-fit">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
