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

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 m"),
  prefix: "sogrub:login",
});

export async function login(prevState: any, formData: FormData) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip");
  const userAgent =
    headersList.get("user-agent")?.substring(0, 50) || "unknown";
  const identifier = `${ip}:${userAgent}`;

  const { success, reset } = await rateLimit.limit(identifier);

  if (!success) {
    const waitTimeMs = reset - Date.now();
    const waitTimeSeconds = Math.ceil(waitTimeMs / 1000);
    const minutes = Math.floor(waitTimeSeconds / 60);
    const seconds = waitTimeSeconds % 60;

    const timeMessage =
      minutes > 0
        ? `${minutes} minuto${minutes > 1 ? "s" : ""} y ${seconds} segundo${
            seconds !== 1 ? "s" : ""
          }`
        : `${seconds} segundo${seconds !== 1 ? "s" : ""}`;

    return {
      error: `Demasiados intentos de inicio de sesión. Espera ${timeMessage}.`,
      resetTime: reset,
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
