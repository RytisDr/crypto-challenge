import { PageHeader } from "@/components/PageHeader";

export type DetailPageHeaderProps = {
  title: string;
  subtitle?: string;
  backLabel?: string;
  maxWidth?: "sm" | "md" | "lg" | "4xl";
};

export function DetailPageHeader({
  title,
  subtitle,
  backLabel,
  maxWidth,
}: DetailPageHeaderProps) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showBack={true}
      backLabel={backLabel}
      maxWidth={maxWidth}
    />
  );
}
