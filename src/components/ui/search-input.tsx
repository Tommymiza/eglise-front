"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./input";

export default function SearchInput({ className }: { className?: string }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  return (
    <Input
      className={className}
      placeholder="Rechercher"
      value={search ?? ""}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);
        params.set("search", e.target.value);
        replace(`${pathname}?${params.toString()}`);
      }}
    />
  );
}
