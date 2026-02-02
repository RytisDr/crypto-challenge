type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[var(--background)] to-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  );
}
