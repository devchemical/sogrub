import { Metadata } from "next";

// Site-wide constants
export const siteConfig = {
  name: "Sogrub",
  fullName: "Sogrub - Restauración y Venta de Muebles",
  description:
    "Restauración artesanal de muebles únicos con diseño moderno y materiales sostenibles. Damos una segunda vida a piezas con historia.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sogrub.vercel.app",
  ogImage: "/images/og-image.png",
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
  author: "Sogrub",
  locale: "es_ES",
  type: "website",
  twitterHandle: "@sogrub",
};

// Generate Open Graph metadata
export function generateOpenGraph(
  title: string,
  description: string,
  image?: string,
  type: "website" | "article" = "website"
): Metadata["openGraph"] {
  return {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: image || siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: siteConfig.locale,
    type,
  };
}

// Generate Twitter Card metadata
export function generateTwitterCard(
  title: string,
  description: string,
  image?: string
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [image || siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  };
}

// JSON-LD Structured Data for Organization
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    sameAs: [
      // Add social media URLs here when available
      // "https://www.facebook.com/sogrub",
      // "https://www.instagram.com/sogrub",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Spanish"],
    },
  };
}

// JSON-LD Structured Data for LocalBusiness
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: "$$",

    address: {
      "@type": "PostalAddress",
      addressCountry: "ES",
      // Add specific address when available
    },
  };
}

// JSON-LD Structured Data for Product
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "EUR",
      availability: "https://schema.org/InStock",
      url: siteConfig.url,
    },
  };
}

// JSON-LD Structured Data for WebSite
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.fullName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "es-ES",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
