"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export async function login(prevState: any, formData: FormData) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent")?.substring(0, 50);
  const identifier = `${ip}:${userAgent}`;

  const { success, limit, remaining, reset } = await rateLimit.limit(
    identifier
  );

  if (!success) {
    return {
      error: "Demasiados intentos. Por favor inténtelo más tarde.",
    };
  }

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Email o contraseña inválidos",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    // Usamos un mensaje genérico por seguridad
    return {
      error: `Credenciales inválidas. Por favor, inténtalo de nuevo. Intentos restantes: ${remaining}`,
    };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
