// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Home, Package, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/products", label: "Catálogo", icon: Package },
    { href: "/#about", label: "Nosotros", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary tracking-tight">
            Sogrub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          <Button size="sm">Contactar</Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menú">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col h-full w-[300px] sm:w-[400px]"
            >
              <SheetHeader className="border-b pb-4 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">Sogrub</span>
                </SheetTitle>
                <SheetDescription>
                  Mobiliario restaurado con historia y diseño único.
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground/80 rounded-md hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <SheetFooter className="border-t pt-6 mt-auto flex flex-col gap-4 sm:flex-col sm:space-x-0">
                <Button className="w-full gap-2" size="lg">
                  <Mail className="h-4 w-4" /> Contactar
                </Button>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Sogrub.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Todos los derechos reservados.
                  </p>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
