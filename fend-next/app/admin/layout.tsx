import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Admin | Ruhul Amin",
  description: "Admin panel for Ruhul Amin portfolio — manage projects, categories, logos, and blog posts.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AuthProvider>
        <Sidebar />
        <div className="lg:ml-64">
          <main className="flex-1 bg-white">{children}</main>
        </div>
      </AuthProvider>
    </div>
  );
}
