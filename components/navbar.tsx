"use client";

import { Building2, Menu, Sun, Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="font-bold text-lg">ConstructQ&A</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/questions" className="text-foreground/80 hover:text-foreground">
              Questions
            </Link>
            <Link href="/ask" className="text-foreground/80 hover:text-foreground">
              Ask Question
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/questions"
                className="text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Questions
              </Link>
              <Link
                href="/ask"
                className="text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Ask Question
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setIsMenuOpen(false);
                }}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}