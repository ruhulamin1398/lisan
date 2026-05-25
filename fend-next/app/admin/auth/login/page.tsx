"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    google?: any;
  }
}

export default function Login() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError(
        "Google client ID is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your .env.",
      );
      return;
    }

    const initGoogle = () => {
      const google = window.google;
      if (!google) return false;

      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", width: "320" },
      );

      return true;
    };

    const interval = window.setInterval(() => {
      if (initGoogle()) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  const handleCredentialResponse = async (response: any) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
      } else {
        setError(data.error || "Google sign-in failed");
      }
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <div className="  w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in with Google
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use your Google account to access admin. Only admin accounts are
            allowed.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-8">
          <div id="google-signin-button" />
          {loading && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Signing in...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
