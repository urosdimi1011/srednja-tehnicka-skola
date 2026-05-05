import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { verifyToken } from "@/lib/auth";
import '../globals.css';
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-100 flex">
      <AdminSidebar user={user} />
      <main className="flex-1 min-w-0 overflow-auto">
        <h1>Admin panel</h1>
        {children}
      </main>
    </div>
  );
}