type ErrorCardProps = {
  title?: string;
  message: string;
  details?: string;
};

export function ErrorCard({
  title = "Error",
  message,
  details,
}: ErrorCardProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
      <p className="text-sm text-[var(--destructive)]">
        <strong>{title}:</strong> {message}
      </p>

      {details && (
        <p className="text-xs text-[var(--destructive)] mt-1">{details}</p>
      )}
    </div>
  );
}
