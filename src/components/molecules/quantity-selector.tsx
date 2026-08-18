"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (Number.isNaN(next)) return;
    onChange(Math.min(max, Math.max(min, next)));
  };

  return (
    <div
      data-slot="quantity-selector"
      className={cn(
        "inline-flex items-center rounded-lg border border-gray-200 bg-white",
        className,
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Kurangi jumlah"
        className="h-11 w-11 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-l-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInput}
        aria-label="Jumlah"
        className="h-11 w-14 text-center text-sm font-semibold bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Tambah jumlah"
        className="h-11 w-11 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-r-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

export { QuantitySelector };
