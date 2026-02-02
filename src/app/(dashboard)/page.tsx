import { fetchTopCoins } from "@/lib/coingecko";
import { CoinList } from "@/components/CoinList";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { ErrorCard } from "@/components/ErrorCard";
import { Coin } from "@/types/coin";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "CryptoQuick: Top 10 Cryptocurrencies",
  description:
    "App that displays the top 10 cryptocurrency prices from CoinGecko API",
};

export default async function Home() {
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
        title="Price Tracker"
        description="Track the top 10 cryptocurrencies in real-time."
      />
      {error && (
        <div className="mb-8">
          <ErrorCard
            message={error}
            details="Please try again later or check your internet connection."
          />
        </div>
      )}
      {coins.length > 0 ? (
        <CoinList coins={coins} />
      ) : (
        !error && (
          <div className="text-center">
            <p className="text-[var(--muted-foreground)]">Loading...</p>
          </div>
        )
      )}
    </PageContainer>
  );
}
