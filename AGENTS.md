# AI Agent Instructions - Sogrub Project

## 🤖 Purpose

This document provides comprehensive instructions for AI agents (like Copilot, Claude, ChatGPT, or custom LLM agents) working on the Sogrub e-commerce application. Follow these guidelines to ensure consistent, high-quality contributions.

## 📋 Project Context

**Sogrub** is a Next.js 16 application for selling restored furniture. The platform allows:

- **Public users**: Browse and view product catalog
- **Admins**: Authenticate and manage products (CRUD operations)
- **Backend**: Supabase (PostgreSQL + Storage + Auth)

## 🎯 Core Principles

### 1. **Understand Before Acting**

- Read existing code before making changes
- Check `types/product.ts` for data structures
- Review `lib/supabase/` for database operations
- Examine `components/` for reusable UI patterns

### 2. **Type Safety First**

- Never use `any` type - prefer `unknown` or proper typing
- All functions must have explicit return types
- Props interfaces must be defined before components
- Use Zod for runtime validation on forms

### 3. **Server vs Client Components**

- Default to Server Components
- Use `'use client'` only when needed:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
  - Event handlers (onClick, onChange, etc.)
  - Third-party libraries requiring client-side

### 4. **Supabase Best Practices**

```typescript
// ✅ Correct - Server Component
import { createClient } from "@/lib/supabase/server";

async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error:", error);
    return <ErrorComponent />;
  }

  return <ProductList products={data} />;
}

// ✅ Correct - Client Component
("use client");
import { createClient } from "@/lib/supabase/client";

function ClientComponent() {
  const supabase = createClient();
  // ... client-side logic
}
```

## 📝 Common Tasks & Patterns

### Adding a New Feature

1. **Define Types** (`types/`)

```typescript
export interface NewFeature {
  id: string;
  name: string;
  created_at: string;
}
```

2. **Create Database Functions** (`lib/supabase/`)

```typescript
export async function getNewFeatures(): Promise<NewFeature[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("new_feature").select("*");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}
```

3. **Build UI Components** (`components/features/`)

```typescript
interface FeatureCardProps {
  feature: NewFeature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{feature.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
```

4. **Create Page/Route** (`app/features/page.tsx`)

```typescript
import { getNewFeatures } from "@/lib/supabase/features";
import { FeatureCard } from "@/components/features/FeatureCard";

export default async function FeaturesPage() {
  const features = await getNewFeatures();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Features</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
}
```

### Creating Forms

Always use React Hook Form + Zod:

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  price: z.number().min(0, "El precio debe ser positivo"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
    },
  });

  async function onSubmit(values: FormData) {
    try {
      // Handle submission
      console.log(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
    </Form>
  );
}
```

### Image Handling

```typescript
// Using Next.js Image component
import Image from "next/image";

<Image
  src={imageUrl}
  alt="Descriptive text"
  width={400}
  height={300}
  className="object-cover"
/>;

// Supabase Storage upload
const file = event.target.files[0];
const fileName = `${Date.now()}-${file.name}`;

const { error: uploadError } = await supabase.storage
  .from("product-images")
  .upload(fileName, file);

const {
  data: { publicUrl },
} = supabase.storage.from("product-images").getPublicUrl(fileName);
```

## 🎨 Styling Guidelines

### Tailwind CSS Patterns

```typescript
// Layout
<div className="container mx-auto px-4 py-8">
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {/* Content */}
  </div>
</div>

// Cards with hover effects
<Card className="overflow-hidden transition-all hover:shadow-lg">
  {/* Content */}
</Card>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Title
</h1>

// Buttons
<Button size="sm" variant="default">
  Click Me
</Button>

// Conditional classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)}>
```

## 🔍 Debugging & Error Handling

### Error Boundaries

```typescript
// error.tsx in any route
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
```

### Loading States

```typescript
// loading.tsx in any route
export default function Loading() {
  return (
    <div className="container mx-auto py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
```

### Console Logging

```typescript
// Development only
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}

// Errors (always log)
console.error("Error context:", error);
```

## 🔐 Security Checklist

- [ ] Never commit `.env.local` or secrets
- [ ] Validate all user input with Zod schemas
- [ ] Use Supabase RLS policies for data access
- [ ] Sanitize file uploads (check size, type, etc.)
- [ ] Use `NEXT_PUBLIC_` only for truly public variables
- [ ] Implement CSRF protection on forms
- [ ] Validate authentication state before admin actions

## 🚀 Performance Optimization

### Images

```typescript
// Always optimize images
import Image from "next/image";

<Image
  src={imageUrl}
  alt="Product"
  width={600}
  height={400}
  loading="lazy"
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>;
```

### Data Fetching

```typescript
// Use Suspense for streaming
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  );
}

// Parallel data fetching
const [products, categories] = await Promise.all([
  getAllProducts(),
  getAllCategories(),
]);
```

### Dynamic Imports

```typescript
// Lazy load heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>Cargando...</p>,
});
```

## 📚 Database Schema Reference

### Products Table

```sql
products (
  id: uuid (PK)
  title: text (NOT NULL)
  description: text
  materials: text
  price: numeric (NOT NULL)
  width: numeric
  height: numeric
  depth: numeric
  image_url: text
  created_at: timestamp
)
```

### RLS Policies

- **SELECT**: Public (anyone can read)
- **INSERT/UPDATE/DELETE**: Authenticated users only

## 🌐 Internationalization

All user-facing text must be in **Spanish (es-ES)**:

```typescript
// ✅ Correct
<Button>Añadir al carrito</Button>
<p>No se encontraron productos</p>

// ❌ Incorrect
<Button>Add to cart</Button>
<p>No products found</p>

// Currency formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

// Date formatting
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};
```

## 🧪 Testing Approach

### Manual Testing Checklist

- [ ] Component renders without errors
- [ ] Forms validate correctly
- [ ] Error states display properly
- [ ] Loading states work
- [ ] Mobile responsive (375px, 768px, 1024px, 1440px)
- [ ] Images load and display correctly
- [ ] Links navigate properly
- [ ] Accessibility (keyboard navigation, ARIA labels)

### Code Review Before Committing

- [ ] TypeScript has no errors
- [ ] No `any` types used
- [ ] Proper error handling implemented
- [ ] Comments added for complex logic
- [ ] Unused imports removed
- [ ] Console.logs removed (except error logging)
- [ ] Follows project naming conventions

## 🛠️ Common Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Supabase
supabase start        # Start local Supabase
supabase db reset     # Reset local database
supabase migration new <name>  # Create new migration
```

## 📖 Key Files to Reference

| File                       | Purpose                       |
| -------------------------- | ----------------------------- |
| `types/product.ts`         | Product interface definition  |
| `lib/supabase/client.ts`   | Client-side Supabase instance |
| `lib/supabase/server.ts`   | Server-side Supabase instance |
| `lib/supabase/products.ts` | Product database operations   |
| `lib/utils.ts`             | Utility functions (cn, etc.)  |
| `components/ui/`           | Reusable UI components        |
| `app/layout.tsx`           | Root layout with metadata     |
| `app/admin/page.tsx`       | Admin dashboard example       |
| `supabase/schema.sql`      | Database schema and RLS       |

## ⚠️ Critical Reminders

1. **Never use default exports** - always use named exports
2. **Server Components by default** - add `'use client'` only when necessary
3. **Type everything** - avoid `any`, use proper TypeScript
4. **Handle errors gracefully** - never let errors crash the app
5. **Spanish language** - all UI text must be in Spanish
6. **Mobile-first** - design for mobile, enhance for desktop
7. **Accessibility** - always include alt text, ARIA labels
8. **Security** - validate input, respect RLS policies

## 🎯 Decision-Making Framework

When you're unsure about an implementation:

1. **Check existing code** - Is there a similar pattern in the codebase?
2. **Follow Next.js conventions** - What does Next.js recommend?
3. **Prioritize type safety** - Can this be more strongly typed?
4. **Consider performance** - Will this impact load time?
5. **Think about UX** - Is this intuitive for Spanish-speaking users?
6. **Security first** - Could this introduce a vulnerability?

---

**Final Note**: When in doubt, prefer simplicity and maintainability over cleverness. Write code that others (including your future self) can understand and modify easily.
