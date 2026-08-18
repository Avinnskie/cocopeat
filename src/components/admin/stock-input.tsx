"use client";

import * as React from "react";
import { Minus, Plus, Check, AlertCircle } from "lucide-react";

const SAVE_DEBOUNCE_MS = 600;

type SaveState = "idle" | "saving" | "saved" | "error";

export function StockInput({
  slug,
  initialStock,
}: {
  slug: string;
  initialStock: number;
}) {
  const [stock, setStock] = React.useState(initialStock);
  const [state, setState] = React.useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const lastCommittedRef = React.useRef(initialStock);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const commit = React.useCallback(
    async (next: number) => {
      setState("saving");
      setErrorMsg(null);
      try {
        const res = await fetch(
          `/api/admin/products/${encodeURIComponent(slug)}/stock`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stock: next }),
          },
        );
        const json = await res.json();
        if (!res.ok || !json.success) {
          setState("error");
          setErrorMsg(json.message ?? "Gagal menyimpan stok.");
          setStock(lastCommittedRef.current);
          return;
        }
        lastCommittedRef.current = next;
        setState("saved");
        setTimeout(() => setState("idle"), 1500);
      } catch {
        setState("error");
        setErrorMsg("Kesalahan jaringan.");
        setStock(lastCommittedRef.current);
      }
    },
    [slug],
  );

  const scheduleCommit = React.useCallback(
    (next: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (next !== lastCommittedRef.current) commit(next);
      }, SAVE_DEBOUNCE_MS);
    },
    [commit],
  );

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const update = (next: number) => {
    const clamped = Math.max(0, Math.floor(next));
    setStock(clamped);
    scheduleCommit(clamped);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
        <button
          type="button"
          onClick={() => update(stock - 1)}
          disabled={stock <= 0 || state === "saving"}
          aria-label="Kurangi stok"
          className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <input
          type="number"
          min={0}
          value={stock}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) update(n);
          }}
          aria-label={`Stok ${slug}`}
          className="h-8 w-14 text-center text-sm font-semibold bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => update(stock + 1)}
          disabled={state === "saving"}
          aria-label="Tambah stok"
          className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {state === "saved" && (
        <span
          className="inline-flex items-center text-[#16A34A]"
          aria-label="Tersimpan"
        >
          <Check className="w-4 h-4" />
        </span>
      )}
      {state === "error" && errorMsg && (
        <span
          title={errorMsg}
          className="inline-flex items-center text-red-600"
          aria-label={errorMsg}
        >
          <AlertCircle className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
