"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Leaf, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Muebles restaurados en un salón moderno"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
        </div>
        <div className="relative z-10 container px-4 md:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 drop-shadow-md">
              Renace la Belleza de tus Muebles
            </h1>
            <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 text-gray-100 drop-shadow-sm">
              En Sogrub, damos una segunda vida a muebles únicos. Restauración artesanal con un toque moderno y sostenible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 shadow-lg"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-colors hover:bg-white/20"
              >
                Conoce Más
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about.png"
                alt="Proceso de restauración"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Artesanía y Sostenibilidad
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Creemos que cada mueble tiene una historia que contar. Nuestro equipo de artesanos expertos trabaja meticulosamente para preservar la esencia de cada pieza mientras la adaptamos a los hogares contemporáneos.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Hammer className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Restauración Artesanal</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Materiales Sostenibles</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Diseños Únicos</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
