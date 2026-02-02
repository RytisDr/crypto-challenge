import type { Metadata } from "next";
import { WatchlistContent } from "@/components/WatchlistContent";
import { fetchTopCoins } from "@/lib/coingecko";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Coin } from "@/types/coin";

export const metadata: Metadata = {
  title: "CryptoQuick: Watchlist",
  description: "View your favorite cryptocurrencies",
};

export default async function WatchlistPage() {
  let coins: Coin[] = [];
  let error: string | null = null;

  try {
    coins = await fetchTopCoins();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load data";
  }

  return (
    <PageContainer>
      <PageHeader
        title="Watchlist"
        description="Your favorite cryptocurrencies."
      />
      <WatchlistContent coins={coins} error={error} />
    </PageContainer>
  );
}
