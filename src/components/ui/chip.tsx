import { cn } from "@/lib/utils";

type ChipProps = {
  className?: string;
  label: string;
};

export default function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        "text-center rounded-[20px] px-4 py-2 font-semibold text-nowrap bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        className
      )}
    >
      {label}
    </span>
  );
}
