"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../utils/constants";

export default function useUser() {
  const [user, setUser] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);

    if (!token) {
      router.replace("/login");
      return;
    }

    axios
      .get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else if (response.status === 200) {
          setUser(response.data.user);
          setAuthToken(response.data.token);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        localStorage.removeItem("token");
        router.replace("/login");
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [router]);

  return { user, authToken, setAuthToken, setUser, isUserLoading };
}
