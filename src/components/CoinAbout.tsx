import { Card } from "@/components/Card";

type Props = {
  name: string;
  description: string;
};

export function CoinAbout({ name, description }: Props) {
  return (
    <Card>
      <div>
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
          About {name}
        </h3>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}
