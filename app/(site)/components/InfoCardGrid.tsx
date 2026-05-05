// components/InfoCardGrid.tsx
import { ArrowRight, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface InfoCardItem {
  icon?: LucideIcon;
  label?: string;
  value?: string;
  href?: string;
  desc?: string;
  children?: ReactNode;
}

export interface InfoCardTitle {
  tag?: string;
  main?: string;
  subtitle?: string;
}

export interface InfoCardGridProps {
  title?: InfoCardTitle;
  items: InfoCardItem[] | null;
  variant?: "default" | "compact" | "large";
  showArrow?: boolean;
}

export default function InfoCardGrid({
  title,
  items = [],
  variant = "default",
  showArrow = true,
}: InfoCardGridProps) {
  const getGridCols = () => {
    switch (variant) {
      case "compact":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case "large":
        return "grid-cols-1 md:grid-cols-2";
      default:
        return "grid-cols-1 sm:grid-cols-2";
    }
  };

  return (
    <div>
      {title && (
        <div className="mb-8">
          {title.tag && (
            <span className="text-crimson-600 text-xs font-bold uppercase tracking-wider">
              {title.tag}
            </span>
          )}
          {title.main && (
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">
              {title.main}
            </h2>
          )}
          {title.subtitle && (
            <p className="text-stone-500 text-sm mt-3 max-w-xl">
              {title.subtitle}
            </p>
          )}
          <div className="w-12 h-0.5 bg-crimson-700 mt-5" />
        </div>
      )}

      <div className={`grid ${getGridCols()} gap-5`}>
        {items?.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group p-6 border border-stone-200 hover:border-crimson-300 hover:shadow-xl transition-all duration-300 bg-white rounded-sm"
            >
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="w-11 h-11 bg-crimson-50 group-hover:bg-crimson-700 flex items-center justify-center shrink-0 transition-colors duration-300 rounded-sm">
                    <Icon
                      size={20}
                      className="text-crimson-700 group-hover:text-white transition-colors"
                    />
                  </div>
                )}
                <div>
                  {item.label && (
                    <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                  )}
                  {item.value && (
                    <p className="text-stone-900 font-bold text-sm break-all">
                      {item.value}
                    </p>
                  )}
                  {item.desc && (
                    <p className="text-stone-400 text-xs mt-1 flex items-center gap-1">
                      {item.desc}
                      {showArrow && (
                        <ArrowRight
                          size={10}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </p>
                  )}
                  {item.children}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
