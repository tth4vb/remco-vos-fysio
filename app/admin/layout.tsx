import { requireAuth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth check for login page
  return <>{children}</>;
}
