"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {data: auth} = useAuth()

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-12 h-12 rounded-full bg-transparent"
        aria-hidden
      />
    );

  const current = resolvedTheme || theme;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(current === "light" ? "dark" : "light")}
      className="w-12 h-12 rounded-full bg-transparent relative flex items-center justify-center"
    >
      {/* Sun Icon */}
      <Sun
        className={`absolute text-white transition-all duration-500 ease-in-out
          ${current === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
        `}
        style={{ width: "1.1rem", height: "1.1rem" }}
      />

      {/* Moon Icon */}
      <Moon
        className={`absolute text-white transition-all duration-500 ease-in-out
          ${current === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}
        `}
        style={{ width: "1.1rem", height: "1.1rem" }}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
