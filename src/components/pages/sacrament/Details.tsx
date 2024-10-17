"use client";

import sacramentStore from "@/store/sacrament";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SacramentDetail() {
  const { sacrament, getSacrament, cancelEdit } = sacramentStore();
  const { idSacrament } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idSacrament === "string") {
      getSacrament(idSacrament);
    }
    return () => {
      cancelEdit();
    };
  }, [idSacrament]);
  return <div></div>;
}
