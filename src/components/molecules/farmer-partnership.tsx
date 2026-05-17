import * as React from "react";
import { Users, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FarmerPartnership } from "@/data/products";

type FarmerPartnershipProps = {
  partnership: FarmerPartnership;
  className?: string;
};

function FarmerPartnership({
  partnership,
  className,
}: FarmerPartnershipProps) {
  return (
    <div
      data-slot="farmer-partnership"
      className={cn(
        "p-4 rounded-xl border border-[#46EC13]/20 bg-[#46EC13]/5",
        className,
      )}
    >
      <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
        <Users className="w-4 h-4 text-[#46EC13]" />
        Kemitraan Petani
      </h4>
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {partnership.description}
      </p>
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users className="w-3.5 h-3.5 text-[#46EC13]" />
          <span className="font-bold">{partnership.farmerCount}</span> petani
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="w-3.5 h-3.5 text-[#46EC13]" />
          {partnership.region}
        </div>
      </div>
    </div>
  );
}

export { FarmerPartnership };
