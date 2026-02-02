import Link from "next/link";
import { routes } from "@/lib/routes";

type DetailPageHeaderProps = {
  title: string;
  subtitle?: string;
  backLabel?: string;
  maxWidth?: "sm" | "md" | "lg" | "4xl";
};

export function DetailPageHeader({
  title,
  subtitle,
  backLabel = "← Back",
  maxWidth = "4xl",
}: DetailPageHeaderProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    "4xl": "max-w-4xl",
  }[maxWidth];

  return (
    <div className={maxWidthClass}>
      <Link
        href={routes.home()}
        className="text-[var(--primary)] hover:text-[var(--primary-foreground)] mb-8 inline-block font-medium transition-colors"
      >
        {backLabel}
      </Link>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--muted-foreground)]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
