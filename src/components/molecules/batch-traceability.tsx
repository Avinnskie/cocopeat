import * as React from "react";
import { QrCode } from "lucide-react";

import { cn } from "@/lib/utils";
import type { BatchInfo } from "@/data/products";

type BatchTraceabilityProps = {
  batchInfo: BatchInfo;
  className?: string;
};

function BatchTraceability({ batchInfo, className }: BatchTraceabilityProps) {
  return (
    <div
      data-slot="batch-traceability"
      className={cn(
        "flex flex-wrap items-start justify-between gap-6",
        className,
      )}
    >
      <div className="flex items-center justify-center size-14 rounded-xl bg-white shadow-sm border border-gray-100 group cursor-help hover:border-[#46EC13] transition-colors">
        <QrCode className="w-8 h-8 text-[#46EC13]" />
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
          Batch Traceability
        </p>
        <p className="text-xs font-bold text-gray-900">
          Batch #{batchInfo.batchNumber}
        </p>
        <p className="text-[10px] text-gray-600">
          {batchInfo.processingDate} • {batchInfo.sourceLocation.split(",")[1]?.trim() || "Pontianak"}
        </p>
        <div className="flex gap-2 mt-2">
          {batchInfo.certifications.map((cert) => (
            <span
              key={cert}
              className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#46EC13]/40 text-[#46EC13] uppercase"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { BatchTraceability };
