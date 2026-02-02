interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
        {title}
      </h1>
      <p className="text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}
