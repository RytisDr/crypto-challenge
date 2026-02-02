import { Card } from "@/components/Card";

type Props = {
  marketCap?: number | null;
};

export function CoinStats({ marketCap }: Props) {
  if (!marketCap) return null;

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--border)]">
        <div>
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            Market Cap
          </p>
          <p className="text-xl font-semibold text-[var(--foreground)]">
            $
            {marketCap >= 1e9
              ? (marketCap / 1e9).toFixed(2) + "B"
              : (marketCap / 1e6).toFixed(2) + "M"}
          </p>
        </div>
      </div>
    </Card>
  );
}
