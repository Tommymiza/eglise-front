"use client";

import christianStore from "@/store/christian";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChristianDetail() {
  const { christian, getChristian, cancelEdit } = christianStore();
  const { idChristian } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idChristian === "string") {
      getChristian(idChristian);
    }
    return () => {
      cancelEdit();
    };
  }, [idChristian]);
  return <div></div>;
}
