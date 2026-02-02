import Link from "next/link";
import { routes } from "@/lib/routes";

type PageHeaderProps = {
  title: string;
  description?: string;
  subtitle?: string;
  showBack?: boolean;
  backLabel?: string;
  maxWidth?: "sm" | "md" | "lg" | "4xl";
};

export function PageHeader({
  title,
  description,
  subtitle,
  showBack = false,
  backLabel = "← Back",
  maxWidth,
}: PageHeaderProps) {
  const maxWidthClass = maxWidth
    ? { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", "4xl": "max-w-4xl" }[
        maxWidth
      ]
    : undefined;

  return (
    <div className={maxWidthClass}>
      {showBack && (
        <Link
          href={routes.home()}
          className="text-[var(--primary)] hover:text-[var(--primary-foreground)] mb-8 inline-block font-medium transition-colors"
        >
          {backLabel}
        </Link>
      )}

      <div className={showBack ? "mb-8" : "mb-12"}>
        <h1
          className={`${
            showBack ? "text-3xl" : "text-4xl"
          } font-bold text-[var(--foreground)] mb-2`}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="text-[var(--muted-foreground)]">{subtitle}</p>
        ) : (
          description && (
            <p className="text-[var(--muted-foreground)]">{description}</p>
          )
        )}
      </div>
    </div>
  );
}
