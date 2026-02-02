"use client";

import { Coin } from "@/types/coin";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import { StarButton } from "./StarButton";
import Link from "next/link";
import { routes } from "@/lib/routes";

export function CoinCard({ coin }: { coin: Coin }) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm hover:shadow-md transition-shadow">
      <Link
        href={routes.coinDetail(coin.id)}
        className="hover:bg-[var(--primary-foreground)] rounded-md transition-colors block"
      >
        <div className="flex items-center gap-3 mb-3 cursor-pointer rounded-md">
          <Image
            src={coin.image}
            alt={coin.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-[var(--foreground)]">
              {coin.name}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>
      </Link>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">Price</span>
          <span className="font-bold text-sm text-[var(--foreground)]">
            $
            {coin.current_price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">
            24h Change
          </span>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <>
                <TrendingUp className="w-4 h-4 text-[var(--chart-1)]" />
                <span className="font-semibold text-sm text-[var(--chart-1)]">
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-[var(--destructive)]" />
                <span className="font-semibold text-sm text-[var(--destructive)]">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 ">
        <StarButton coinId={coin.id} />
      </div>
    </div>
  );
}
