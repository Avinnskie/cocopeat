import * as React from "react";
import { Leaf, Droplet, Recycle, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SustainabilityMetric } from "@/data/products";

type SustainabilityBadgesProps = {
  metrics: SustainabilityMetric[];
  className?: string;
};

const iconMap: Record<string, React.ReactNode> = {
  eco: <Leaf className="w-4 h-4" />,
  water_drop: <Droplet className="w-4 h-4" />,
  recycling: <Recycle className="w-4 h-4" />,
  local_shipping: <Truck className="w-4 h-4" />,
};

function SustainabilityBadges({
  metrics,
  className,
}: SustainabilityBadgesProps) {
  return (
    <div
      data-slot="sustainability-badges"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {metrics.map((metric) => (
        <span
          key={metric.label}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#46EC13]/10 text-[#16A34A] text-xs font-bold border border-[#46EC13]/20"
        >
          {iconMap[metric.icon] || <Leaf className="w-4 h-4" />}
          <span className="text-gray-700">{metric.label}:</span> {metric.value}
        </span>
      ))}
    </div>
  );
}

export { SustainabilityBadges };
