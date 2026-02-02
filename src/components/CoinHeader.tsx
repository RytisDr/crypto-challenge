import Image from "next/image";
import { StarButton } from "@/components/StarButton";
import { Card } from "@/components/Card";
import { CoinDetail } from "@/types/coin";

type Props = {
  coin: CoinDetail;
  price?: number | null;
};

export function CoinHeader({ coin, price }: Props) {
  return (
    <Card className="mb-8">
      <div className="flex items-start gap-6 mb-6">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              {coin.name}
            </h2>
            <span className="text-sm font-semibold text-[var(--muted-foreground)] uppercase px-2 py-1 bg-[var(--background)] rounded">
              {coin.symbol}
            </span>
            <StarButton coinId={coin.id} />
          </div>

          {price && (
            <p className="text-3xl font-bold text-[var(--foreground)]">
              ${" "}
              {price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
