import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export default async function proxy(req: NextRequest) {
  // Tu lógica de middleware existente aquí
  // Por ejemplo, si estabas manejando autenticación:

  const response = NextResponse.next();

  // ... tu lógica ...

  return response;
}
