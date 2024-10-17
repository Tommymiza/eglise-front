"use client";

import apvStore from "@/store/apv";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApvDetail() {
  const { apv, getApv, cancelEdit } = apvStore();
  const { idApv } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idApv === "string") {
      getApv(idApv);
    }
    return () => {
      cancelEdit();
    };
  }, [idApv]);
  return <div></div>;
}
