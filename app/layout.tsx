import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/GeistMonoVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sogrub.vercel.app"
  ),
  title: {
    default: "Sogrub - Restauración y Venta de Muebles",
    template: "%s | Sogrub",
  },
  description:
    "Restauración artesanal de muebles únicos con diseño moderno y materiales sostenibles. Damos una segunda vida a piezas con historia.",
  keywords: [
    "restauración de muebles",
    "muebles restaurados",
    "muebles vintage",
    "muebles artesanales",
    "restauración artesanal",
    "muebles sostenibles",
    "muebles únicos",
    "segunda mano",
    "decoración vintage",
    "muebles con historia",
  ],
  authors: [{ name: "Sogrub" }],
  creator: "Sogrub",
  publisher: "Sogrub",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Sogrub",
    title: "Sogrub - Restauración y Venta de Muebles",
    description:
      "Restauración artesanal de muebles únicos con diseño moderno y materiales sostenibles.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sogrub - Restauración de Muebles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sogrub - Restauración y Venta de Muebles",
    description:
      "Restauración artesanal de muebles únicos con diseño moderno y materiales sostenibles.",
    images: ["/images/og-image.png"],
    creator: "@sogrub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
