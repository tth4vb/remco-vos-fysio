import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Simple password - in production, use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "remco2024";
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TOKEN = "authenticated_admin_session";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === SESSION_TOKEN;
}

export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
