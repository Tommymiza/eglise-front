"use client";
import authStore from "@/store/auth";
import { useEffect } from "react";
import Layout from "../Layout";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { auth, getMe } = authStore();
  useEffect(() => {
    async function getConnectedUser() {
      try {
        await getMe();
      } catch (error) {
        if (window.location.pathname !== "/") window.location.href = "/";
      }
    }
    getConnectedUser();
  }, []);
  return auth && <Layout>{children}</Layout>;
}
