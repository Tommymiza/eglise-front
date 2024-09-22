import { cn } from "@/lib/utils";

type ChipProps = {
  className: string;
  label: string;
};

export default function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        "text-center rounded-[8px] px-4 py-1 text-nowrap",
        className
      )}
    >
      {label}
    </span>
  );
}
