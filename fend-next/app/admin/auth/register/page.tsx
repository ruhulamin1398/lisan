"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registration Disabled
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Admin access is available only through Google sign-in.
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm text-gray-700">
            If you need admin access, ask the administrator to update your role
            to
            <span className="font-semibold"> admin </span> in the database.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/auth/login"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Google Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
