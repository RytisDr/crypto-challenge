type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 ${className}`}
    >
      {children}
    </div>
  );
}
