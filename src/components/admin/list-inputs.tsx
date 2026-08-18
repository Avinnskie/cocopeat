"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ROW_INPUT_CLASS =
  "flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-[#46EC13] focus:ring-2 focus:ring-[#46EC13]/15";

function RowDelete({
  onClick,
  disabled,
  ariaLabel,
}: {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

function AddRowButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="h-9 text-sm gap-2"
    >
      <Plus className="w-4 h-4" />
      {label}
    </Button>
  );
}

export function StringListInput({
  values,
  onChange,
  placeholder,
  addLabel = "Tambah baris",
  disabled,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  disabled?: boolean;
}) {
  const update = (idx: number, v: string) =>
    onChange(values.map((cur, i) => (i === idx ? v : cur)));
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const add = () => onChange([...values, ""]);

  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={v}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
          <RowDelete
            onClick={() => remove(i)}
            disabled={disabled}
            ariaLabel={`Hapus baris ${i + 1}`}
          />
        </div>
      ))}
      <AddRowButton onClick={add} label={addLabel} disabled={disabled} />
    </div>
  );
}

export type LabelValueItem = { label: string; value: string };

export function LabelValueListInput({
  items,
  onChange,
  labelPlaceholder = "Label",
  valuePlaceholder = "Nilai",
  addLabel = "Tambah baris",
  disabled,
}: {
  items: LabelValueItem[];
  onChange: (next: LabelValueItem[]) => void;
  labelPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
  disabled?: boolean;
}) {
  const update = (idx: number, patch: Partial<LabelValueItem>) =>
    onChange(items.map((cur, i) => (i === idx ? { ...cur, ...patch } : cur)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () => onChange([...items, { label: "", value: "" }]);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
            placeholder={labelPlaceholder}
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.value}
            onChange={(e) => update(i, { value: e.target.value })}
            placeholder={valuePlaceholder}
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <RowDelete
            onClick={() => remove(i)}
            disabled={disabled}
            ariaLabel={`Hapus baris ${i + 1}`}
          />
        </div>
      ))}
      <AddRowButton onClick={add} label={addLabel} disabled={disabled} />
    </div>
  );
}

export type SustainabilityItem = { label: string; value: string; icon: string };

export function SustainabilityListInput({
  items,
  onChange,
  disabled,
}: {
  items: SustainabilityItem[];
  onChange: (next: SustainabilityItem[]) => void;
  disabled?: boolean;
}) {
  const update = (idx: number, patch: Partial<SustainabilityItem>) =>
    onChange(items.map((cur, i) => (i === idx ? { ...cur, ...patch } : cur)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () => onChange([...items, { label: "", value: "", icon: "" }]);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
            placeholder="Label"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.value}
            onChange={(e) => update(i, { value: e.target.value })}
            placeholder="Nilai"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.icon}
            onChange={(e) => update(i, { icon: e.target.value })}
            placeholder="Icon (e.g. eco)"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <RowDelete
            onClick={() => remove(i)}
            disabled={disabled}
            ariaLabel={`Hapus baris ${i + 1}`}
          />
        </div>
      ))}
      <AddRowButton
        onClick={add}
        label="Tambah metric"
        disabled={disabled}
      />
    </div>
  );
}

export type ApplicationItem = {
  name: string;
  icon: string;
  description?: string;
};

export function ApplicationsListInput({
  items,
  onChange,
  disabled,
}: {
  items: ApplicationItem[];
  onChange: (next: ApplicationItem[]) => void;
  disabled?: boolean;
}) {
  const update = (idx: number, patch: Partial<ApplicationItem>) =>
    onChange(items.map((cur, i) => (i === idx ? { ...cur, ...patch } : cur)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () =>
    onChange([...items, { name: "", icon: "", description: "" }]);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50"
        >
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <input
                value={item.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Nama aplikasi"
                disabled={disabled}
                className={ROW_INPUT_CLASS}
              />
              <input
                value={item.icon}
                onChange={(e) => update(i, { icon: e.target.value })}
                placeholder="Icon (e.g. spa)"
                disabled={disabled}
                className={`${ROW_INPUT_CLASS} flex-none w-40`}
              />
            </div>
            <input
              value={item.description ?? ""}
              onChange={(e) => update(i, { description: e.target.value })}
              placeholder="Deskripsi (opsional)"
              disabled={disabled}
              className={ROW_INPUT_CLASS}
            />
          </div>
          <RowDelete
            onClick={() => remove(i)}
            disabled={disabled}
            ariaLabel={`Hapus aplikasi ${i + 1}`}
          />
        </div>
      ))}
      <AddRowButton
        onClick={add}
        label="Tambah aplikasi"
        disabled={disabled}
      />
    </div>
  );
}

export type ComparisonItem = {
  metric: string;
  cocopeatPlus: string;
  regularSoil: string;
  peatMoss: string;
  importedCocopeat: string;
};

export function ComparisonListInput({
  items,
  onChange,
  disabled,
}: {
  items: ComparisonItem[];
  onChange: (next: ComparisonItem[]) => void;
  disabled?: boolean;
}) {
  const update = (idx: number, patch: Partial<ComparisonItem>) =>
    onChange(items.map((cur, i) => (i === idx ? { ...cur, ...patch } : cur)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () =>
    onChange([
      ...items,
      {
        metric: "",
        cocopeatPlus: "",
        regularSoil: "",
        peatMoss: "",
        importedCocopeat: "",
      },
    ]);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50"
        >
          <input
            value={item.metric}
            onChange={(e) => update(i, { metric: e.target.value })}
            placeholder="Metric"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.cocopeatPlus}
            onChange={(e) => update(i, { cocopeatPlus: e.target.value })}
            placeholder="Cocopeat Plus"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.regularSoil}
            onChange={(e) => update(i, { regularSoil: e.target.value })}
            placeholder="Regular Soil"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.peatMoss}
            onChange={(e) => update(i, { peatMoss: e.target.value })}
            placeholder="Peat Moss"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <input
            value={item.importedCocopeat}
            onChange={(e) => update(i, { importedCocopeat: e.target.value })}
            placeholder="Imported Cocopeat"
            disabled={disabled}
            className={ROW_INPUT_CLASS}
          />
          <RowDelete
            onClick={() => remove(i)}
            disabled={disabled}
            ariaLabel={`Hapus baris ${i + 1}`}
          />
        </div>
      ))}
      <AddRowButton
        onClick={add}
        label="Tambah comparison"
        disabled={disabled}
      />
    </div>
  );
}
