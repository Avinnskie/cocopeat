import * as React from "react";
import { Package, Clock, Droplets, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";
import type { StorageInfo } from "@/data/products";

type StorageInstructionsProps = {
  storage: StorageInfo;
  title?: string;
  className?: string;
};

function StorageInstructions({
  storage,
  title = "Penyimpanan & Penanganan",
  className,
}: StorageInstructionsProps) {
  return (
    <section
      data-slot="storage-instructions"
      className={cn(className)}
    >
      {title && <h3 className="font-bold text-lg sm:text-xl mb-6">{title}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#46EC13]" />
            Instruksi Penyimpanan
          </h4>
          <ul className="space-y-2">
            {storage.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <Calendar className="w-5 h-5 text-[#46EC13] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900 mb-1">
                Masa Simpan
              </p>
              <p className="text-sm text-gray-700">{storage.shelfLife}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <Clock className="w-5 h-5 text-[#46EC13] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900 mb-1">
                Waktu Rehidrasi
              </p>
              <p className="text-sm text-gray-700">{storage.rehydrationTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <Droplets className="w-5 h-5 text-[#46EC13] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900 mb-1">
                Rasio Air
              </p>
              <p className="text-sm text-gray-700">{storage.waterRatio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { StorageInstructions };
