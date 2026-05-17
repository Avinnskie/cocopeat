"use client";

import * as React from "react";
import { BarChart3, FileText, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { TechnicalSpecs } from "./technical-specs";
import { StorageInstructions } from "./storage-instructions";

type ProductTabsProps = {
  product: Product;
  className?: string;
};

type TabId = "description" | "composition" | "instructions";

function ProductTabs({ product, className }: ProductTabsProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>("description");

  const tabs = [
    { id: "description" as TabId, label: "Deskripsi", icon: FileText },
    { id: "composition" as TabId, label: "Komposisi", icon: BarChart3 },
    { id: "instructions" as TabId, label: "Instruksi Penggunaan", icon: Package },
  ];

  return (
    <section
      data-slot="product-tabs"
      className={cn("rounded-2xl border border-gray-100", className)}
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-100 overflow-x-auto">
        <nav className="flex gap-8 px-5 sm:px-6 md:px-8 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-[#46EC13] text-[#16A34A]"
                    : "border-transparent text-gray-600 hover:text-gray-900",
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-5 sm:p-6 md:p-8">
        {activeTab === "description" && (
          <div className="prose prose-stone max-w-none">
            <h3 className="text-xl font-bold mb-4">Tentang {product.name}</h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>{product.longDescription || product.description}</p>

              {product.highlights && product.highlights.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-bold text-base mb-3">Keunggulan Produk:</h4>
                  <ul className="space-y-2">
                    {product.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.farmerPartnership && (
                <div className="mt-6 p-4 rounded-xl border border-[#46EC13]/20 bg-[#46EC13]/5">
                  <h4 className="font-bold text-base mb-2">Kemitraan Petani</h4>
                  <p className="text-sm text-gray-700">
                    {product.farmerPartnership.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "composition" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Komposisi & Analisis Nutrisi</h3>
              <p className="text-sm text-gray-600 mb-6">
                Data komposisi ini berdasarkan pengujian batch rata-rata yang dilakukan oleh Agricultural Research Institute (2024).
              </p>
            </div>

            {product.technicalSpecs && product.technicalSpecs.length > 0 && (
              <div>
                <h4 className="font-bold text-base mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#46EC13]" />
                  Spesifikasi Teknis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {product.technicalSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4 py-2 border-b border-dashed border-gray-100"
                    >
                      <dt className="text-sm text-gray-600">{spec.label}</dt>
                      <dd className="text-sm font-bold text-right">
                        {spec.label === "EC Level" ? (
                          <span className="text-[#16A34A]">{spec.value}</span>
                        ) : (
                          spec.value
                        )}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.specs && product.specs.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-base mb-4">Informasi Produk</h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4 py-2 border-b border-gray-200 last:border-0"
                    >
                      <dt className="text-sm text-gray-600">{spec.label}</dt>
                      <dd className="text-sm font-semibold text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        )}

        {activeTab === "instructions" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Instruksi Penggunaan & Penyimpanan</h3>
              <p className="text-sm text-gray-600 mb-6">
                Ikuti panduan berikut untuk hasil optimal dan masa simpan yang lebih lama.
              </p>
            </div>

            {product.storage && (
              <StorageInstructions storage={product.storage} title="" />
            )}

            {product.applications && product.applications.length > 0 && (
              <div className="mt-8">
                <h4 className="font-bold text-base mb-4">Aplikasi Penggunaan</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.applications.map((app) => (
                    <div
                      key={app.name}
                      className="p-4 rounded-xl border border-gray-100 hover:border-[#46EC13] hover:bg-[#46EC13]/5 transition-all"
                    >
                      <h5 className="font-bold text-sm mb-1">{app.name}</h5>
                      {app.description && (
                        <p className="text-xs text-gray-600">{app.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export { ProductTabs };
