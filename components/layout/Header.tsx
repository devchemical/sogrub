"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Sogrub</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link
            href="/products"
            className="transition-colors hover:text-primary"
          >
            Productos
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-base font-medium py-2 transition-colors hover:text-primary"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              href="/products"
              className="text-base font-medium py-2 transition-colors hover:text-primary"
              onClick={closeMenu}
            >
              Productos
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
