"use client";

import authStore from "@/store/auth";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownItem, DropdownLabel } from "./dropdown";

export default function SignoutBtn() {
  const router = useRouter();
  const { logout } = authStore();
  const handleLogout = async () => {
    logout();
    router.refresh();
  };
  return (
    <DropdownItem onClick={() => handleLogout()} className="cursor-pointer">
      <LogOut />
      <DropdownLabel>Déconnexion</DropdownLabel>
    </DropdownItem>
  );
}
