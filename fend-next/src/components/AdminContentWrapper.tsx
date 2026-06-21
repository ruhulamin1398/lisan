"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function AdminContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const isAuthenticated = !isLoading && user;

  return (
    <div className={isAuthenticated ? "lg:ml-64" : ""}>
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
