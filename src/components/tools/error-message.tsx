import * as Headless from "@headlessui/react";
import clsx from "clsx";

export function ErrorMessage({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DescriptionProps,
  "as" | "className"
>) {
  return (
    <Headless.Description
      data-slot="error"
      {...props}
      className={clsx(
        className,
        "text-[0.5rem]/4 text-red-600 data-[disabled]:opacity-50 sm:text-[0.7rem]/4 dark:text-red-500"
      )}
    />
  );
}
