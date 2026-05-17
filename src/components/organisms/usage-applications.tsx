import * as React from "react";
import { Droplet, Sprout, Mountain, Leaf, Flower2, Building2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { UsageApplication } from "@/data/products";

type UsageApplicationsProps = {
  applications: UsageApplication[];
  title?: string;
  className?: string;
};

const iconMap: Record<string, React.ReactNode> = {
  water_drop: <Droplet className="w-6 h-6" />,
  spa: <Sprout className="w-6 h-6" />,
  landscape: <Mountain className="w-6 h-6" />,
  nature: <Leaf className="w-6 h-6" />,
  local_florist: <Flower2 className="w-6 h-6" />,
  park: <Building2 className="w-6 h-6" />,
};

function UsageApplications({
  applications,
  title = "Aplikasi Penggunaan",
  className,
}: UsageApplicationsProps) {
  if (applications.length === 0) return null;

  return (
    <section
      data-slot="usage-applications"
      className={cn(
        "bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 md:p-8",
        className,
      )}
    >
      <h3 className="font-bold text-lg sm:text-xl mb-6">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {applications.map((app) => (
          <div
            key={app.name}
            className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-[#46EC13] hover:bg-[#46EC13]/5 transition-all group"
          >
            <div className="flex items-center justify-center size-12 rounded-full bg-[#46EC13]/10 text-[#16A34A] mb-3 group-hover:bg-[#46EC13]/20 transition-colors">
              {iconMap[app.icon] || <Sprout className="w-6 h-6" />}
            </div>
            <h4 className="font-bold text-sm mb-1">{app.name}</h4>
            {app.description && (
              <p className="text-xs text-muted-foreground">{app.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { UsageApplications };
