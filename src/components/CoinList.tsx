"use client";

import { useState } from "react";
import { Coin } from "@/types/coin";
import { CoinCard } from "./CoinCard";
import { Search } from "lucide-react";

export function CoinList({ coins }: { coins: Coin[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Search coins by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
        />
      </div>

      {searchQuery && (
        <p className="text-sm text-[var(--muted-foreground)]">
          Found {filteredCoins.length} of {coins.length} coins
        </p>
      )}

      {filteredCoins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[var(--muted-foreground)]">
            {searchQuery
              ? "No coins found matching your search."
              : "No coins available."}
          </p>
        </div>
      )}
    </div>
  );
}
