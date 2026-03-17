import { cn } from "@/lib/utils";

function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-50",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
