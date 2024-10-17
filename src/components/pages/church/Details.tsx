"use client";

import churchStore from "@/store/church";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChurchDetail() {
  const { church, getChurch, cancelEdit } = churchStore();
  const { idChurch } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idChurch === "string") {
      getChurch(idChurch);
    }
    return () => {
      cancelEdit();
    };
  }, [idChurch]);
  return <div></div>;
}
