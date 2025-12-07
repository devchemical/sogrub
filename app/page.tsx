"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Leaf, Sparkles } from "lucide-react";
import Script from "next/script";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/metadata";

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* Structured Data */}
      <Script
        id="organization-schema"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[calc(100svh-4rem)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/landing.png"
              alt="Muebles restaurados en un salón moderno"
              fill
              className="object-cover brightness-[0.7]"
              priority
              quality={90}
              sizes="100vw"
            />
            {/* Overlay oscuro para mejorar contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-6">
                Renace la Belleza de tus Muebles
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-[700px] mx-auto mb-6 md:mb-8 text-white px-2">
                En Sogrub, damos una segunda vida a muebles únicos. Restauración
                artesanal con un toque moderno y sostenible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 shadow-lg"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-colors hover:bg-white/20"
                >
                  Conoce Más
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-12 sm:py-16 md:py-20 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center"
            >
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about.png"
                  alt="Mueble restaurado de madera en taller"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
                  Artesanía y Sostenibilidad
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6">
                  Creemos que cada mueble tiene una historia que contar. Nuestro
                  equipo de artesanos expertos trabaja meticulosamente para
                  preservar la esencia de cada pieza mientras la adaptamos a los
                  hogares contemporáneos.
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground flex-shrink-0">
                      <Hammer className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      Restauración Artesanal
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground flex-shrink-0">
                      <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      Materiales Sostenibles
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground flex-shrink-0">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      Diseños Únicos
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
