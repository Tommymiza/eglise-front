"use client";

import userStore from "@/store/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserDetail() {
  const { user, getUser, cancelEdit } = userStore();
  const { idUser } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idUser === "string") {
      getUser(idUser);
    }
    return () => {
      cancelEdit();
    };
  }, [idUser]);
  return <div></div>;
}
