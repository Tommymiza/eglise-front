"use client";

import authStore from "@/store/auth";

import { Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownItem, DropdownLabel } from "./dropdown";

export default function AvatarItems({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { logout } = authStore();
  const handleLogout = async () => {
    logout();
    router.refresh();
  };
  return (
    <>
      <DropdownItem
        className="cursor-pointer data-[focus]:bg-zinc-900 gap-2"
        onClick={() => setOpen(true)}
      >
        <Lock />
        <DropdownLabel>Changer le mot de passe</DropdownLabel>
      </DropdownItem>
      <DropdownItem
        onClick={() => handleLogout()}
        className="cursor-pointer data-[focus]:bg-zinc-900 gap-2"
      >
        <LogOut />
        <DropdownLabel>Déconnexion</DropdownLabel>
      </DropdownItem>
    </>
  );
}
