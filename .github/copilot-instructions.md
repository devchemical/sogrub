# GitHub Copilot Instructions - Sogrub Project

## 📋 Project Overview

Sogrub is a Next.js 16 e-commerce application for selling and showcasing restored furniture. The application uses **Next.js App Router**, **TypeScript**, **Supabase** for backend services, and **Tailwind CSS** for styling.

## 🎯 Core Technologies

- **Framework**: Next.js 16.0.5 (App Router)
- **Language**: TypeScript 5+ (strict mode enabled)
- **Styling**: Tailwind CSS v4 with `tw-animate-css`
- **UI Components**: Radix UI primitives with custom components
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **State Management**: React 19.2.0
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm

## 🏗️ Architecture Principles

### File Structure

- Use the `app/` directory for all routes (App Router)
- Components go in `components/` with subdirectories:
  - `components/features/` - Feature-specific components
  - `components/layout/` - Layout components (Header, Footer)
  - `components/ui/` - Reusable UI primitives
- Business logic in `lib/` directory
- Type definitions in `types/` directory
- Supabase utilities in `lib/supabase/`

### Naming Conventions

- **Files**: Use PascalCase for React components (`ProductCard.tsx`)
- **Functions**: Use camelCase (`getProducts`, `createProduct`)
- **Types/Interfaces**: Use PascalCase with descriptive names (`Product`, `ProductCardProps`)
- **CSS**: Use kebab-case for class names
- **Constants**: Use UPPER_SNAKE_CASE

## 💻 Code Style Guidelines

### TypeScript

- **Always** use TypeScript, never plain JavaScript
- Enable and respect strict mode
- Define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/intersections
- Avoid `any` - use `unknown` if type is truly unknown
- Use type imports: `import type { ... }`

### React Components

- Use functional components with TypeScript
- Prefer named exports for components
- Use the `interface` keyword for props
- Always destructure props in function signature
- Use proper typing for children: `React.ReactNode`

```typescript
// ✅ Good
interface ProductCardProps {
  product: Product;
  onSelect?: (id: string) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  // ...
}

// ❌ Avoid
export default function ProductCard(props: any) {
  // ...
}
```

### Next.js Specific

- Use Server Components by default
- Add `'use client'` directive only when necessary (hooks, events, browser APIs)
- Use `next/image` for images with proper `alt` attributes
- Use `next/link` for navigation
- Implement proper metadata in `layout.tsx` and `page.tsx`
- Use the App Router file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)

### Supabase Integration

- Use the client from `lib/supabase/client.ts` for client-side operations
- Use server client for Server Components and API routes
- Always handle Supabase errors gracefully
- Use TypeScript types generated from Supabase schema
- Respect RLS (Row Level Security) policies

```typescript
// ✅ Good - Client Component
"use client";
import { supabase } from "@/lib/supabase/client";

const { data, error } = await supabase.from("products").select("*");

if (error) {
  console.error("Error fetching products:", error);
  return null;
}
```

## 🎨 Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes exclusively - avoid custom CSS when possible
- Use the `cn()` utility from `lib/utils.ts` for conditional classes
- Follow mobile-first responsive design (sm:, md:, lg:, xl:)
- Use semantic color tokens (primary, secondary, muted, accent)
- Respect the existing design system from `components/ui/`

```typescript
// ✅ Good
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### Accessibility

- Always include proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Maintain sufficient color contrast
- Add proper alt text to images

## 📦 Component Development

### shadcn/ui Components

- Use existing components from `components/ui/`
- If adding new shadcn components, run: `npx shadcn@latest add [component]`
- Don't modify shadcn components directly - extend them instead
- Available components: `button`, `card`, `form`, `input`, `label`, `textarea`

### Custom Components

- Keep components small and focused (Single Responsibility)
- Extract reusable logic into custom hooks
- Use composition over prop drilling
- Document complex props with JSDoc comments

```typescript
/**
 * Displays a product card with image, title, price, and description
 * @param product - Product data from Supabase
 */
export function ProductCard({ product }: ProductCardProps) {
  // ...
}
```

## 🔐 Environment & Security

### Environment Variables

- Never commit `.env.local` or expose secrets
- Required variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Use `NEXT_PUBLIC_` prefix only for client-safe variables
- Validate environment variables at runtime

### Security Best Practices

- Validate all user input with Zod schemas
- Use Supabase RLS policies for data access control
- Sanitize data before rendering
- Use CSP headers when possible
- Never trust client-side data in server actions

## 🚀 Performance

### Optimization

- Use `next/image` with proper sizing and lazy loading
- Implement proper caching strategies
- Minimize client-side JavaScript
- Use Server Components when possible
- Lazy load heavy components with `next/dynamic`

### Data Fetching

- Prefer Server Components for data fetching
- Use Suspense boundaries for async components
- Implement proper loading and error states
- Cache Supabase queries when appropriate

```typescript
// ✅ Good - Server Component with proper error handling
async function ProductsPage() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) throw new Error("Failed to load products");

  return <ProductGrid products={products} />;
}
```

## 📝 Forms & Validation

### React Hook Form + Zod

- Use React Hook Form for all forms
- Define Zod schemas for validation
- Use `@hookform/resolvers` for integration
- Provide clear error messages in Spanish
- Handle form submission errors gracefully

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  price: z.number().positive("El precio debe ser positivo"),
});

type ProductFormData = z.infer<typeof productSchema>;
```

## 🌐 Internationalization

- Primary language: Spanish (es)
- Use proper Spanish for UI text and messages
- Format currency as EUR: `new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" })`
- Use Spanish date formatting
- Keep error messages user-friendly in Spanish

## 🧪 Code Quality

### Best Practices

- Write self-documenting code
- Keep functions pure when possible
- Avoid side effects in render
- Handle loading and error states
- Use early returns to reduce nesting
- Comment complex logic, not obvious code

### Error Handling

```typescript
// ✅ Good
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error("Operation failed:", error);
  // Show user-friendly error message
  return null;
}
```

## 📚 Common Patterns

### Product Data Interface

```typescript
interface Product {
  id: string;
  title: string;
  description: string | null;
  materials: string | null;
  price: number;
  width: number | null;
  height: number | null;
  depth: number | null;
  image_url: string | null;
  created_at: string;
}
```

### Path Aliases

- Use `@/` prefix for all imports
- Example: `import { Product } from "@/types/product"`

## 🚫 What to Avoid

- ❌ Default exports (prefer named exports)
- ❌ Inline styles (use Tailwind classes)
- ❌ `any` type (use proper typing)
- ❌ Mutating state directly
- ❌ Prop drilling (use Context or composition)
- ❌ Mixing Client and Server Component logic
- ❌ Ignoring TypeScript errors
- ❌ Console.log in production code (use proper logging)

## 📖 Additional Resources

When working with this project, reference:

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

---

**Remember**: Write code that is readable, maintainable, and follows Next.js and React best practices. When in doubt, prioritize type safety, performance, and user experience.
