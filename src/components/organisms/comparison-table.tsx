import * as React from "react";

import { cn } from "@/lib/utils";
import type { ComparisonItem } from "@/data/products";

type ComparisonTableProps = {
  comparison: ComparisonItem[];
  title?: string;
  className?: string;
};

function ComparisonTable({
  comparison,
  title = "Mengapa Cocopeat Plus?",
  className,
}: ComparisonTableProps) {
  if (comparison.length === 0) return null;

  return (
    <section
      data-slot="comparison-table"
      className={cn(
        "bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 md:p-8",
        className,
      )}
    >
      <h3 className="font-bold text-lg sm:text-xl mb-6">{title}</h3>
      <div className="overflow-x-auto -mx-5 sm:-mx-6 md:-mx-8 px-5 sm:px-6 md:px-8">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-2 font-bold text-gray-900">
                Metrik
              </th>
              <th className="text-center py-3 px-2 font-bold text-[#16A34A] bg-[#46EC13]/5">
                Cocopeat Plus
              </th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">
                Tanah Biasa
              </th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">
                Peat Moss
              </th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">
                Cocopeat Import
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((item, index) => (
              <tr
                key={item.metric}
                className={cn(
                  "border-b border-gray-100",
                  index % 2 === 0 && "bg-gray-50/50",
                )}
              >
                <td className="py-3 px-2 font-medium text-gray-900">
                  {item.metric}
                </td>
                <td className="py-3 px-2 text-center font-bold text-[#16A34A] bg-[#46EC13]/5">
                  {item.cocopeatPlus}
                </td>
                <td className="py-3 px-2 text-center text-gray-700">
                  {item.regularSoil}
                </td>
                <td className="py-3 px-2 text-center text-gray-700">
                  {item.peatMoss}
                </td>
                <td className="py-3 px-2 text-center text-gray-700">
                  {item.importedCocopeat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export { ComparisonTable };
