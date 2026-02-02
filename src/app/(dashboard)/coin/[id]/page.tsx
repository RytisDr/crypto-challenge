import { fetchCoinDetail } from "@/lib/coingecko";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ErrorCard } from "@/components/ErrorCard";
import { CoinHeader } from "@/components/CoinHeader";
import { CoinStats } from "@/components/CoinStats";
import { CoinAbout } from "@/components/CoinAbout";

const pageDescription =
  "View detailed information about a specific cryptocurrency";

export async function generateMetadata({ params }: { params: any }) {
  try {
    const resolved = await params;
    const id = resolved?.id as string | undefined;
    if (!id) {
      return {
        title: "Coin Not found - CryptoQuick",
        description: pageDescription,
      };
    }

    const coin = await fetchCoinDetail(id);
    return {
      title: `${coin.name} (${coin.symbol.toUpperCase()}) - CryptoQuick`,
      description:
        coin.description?.en?.slice(0, 160) ||
        `${coin.name} cryptocurrency details`,
    };
  } catch (err) {
    return {
      title: "Coin Details - CryptoQuick",
      description: pageDescription,
    };
  }
}

export default async function CoinPage({ params }: { params: any }) {
  const resolved = await params;
  const id = resolved?.id as string | undefined;

  let coin = null;
  let error: string | null = null;

  try {
    if (!id) {
      throw new Error("Coin ID is required");
    }
    coin = await fetchCoinDetail(id);
  } catch (err) {
    if (err instanceof Error) {
      // Handle 404 Not Found
      if (/API Error:\s*404|\b404\b/i.test(err.message)) {
        return notFound();
      }
      // Handle rate limit errors
      if (/429|rate limit|API Error:\s*429/i.test(err.message)) {
        error = "Rate limit exceeded. Please try again in a moment.";
      } else {
        error = err.message;
      }
    } else {
      error = "Failed to load coin details";
    }
  }

  if (error || !coin) {
    return (
      <main className="bg-gradient-to-br from-[var(--background)] to-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <PageHeader title="Coin Not Found" showBack />
          <div className="mb-8">
            <ErrorCard message={error || "Coin not found"} />
          </div>
        </div>
      </main>
    );
  }

  const marketCap = coin.market_data?.market_cap?.usd;
  const price = coin.market_data?.current_price?.usd;
  const description = coin.description?.en || "No description available";

  return (
    <main className="bg-gradient-to-br from-[var(--background)] to-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title={coin.name}
          subtitle={coin.symbol.toUpperCase()}
          showBack
          maxWidth="4xl"
        />

        <CoinHeader coin={coin} price={price} />

        <CoinStats marketCap={marketCap} />

        <CoinAbout name={coin.name} description={description} />
      </div>
    </main>
  );
}
