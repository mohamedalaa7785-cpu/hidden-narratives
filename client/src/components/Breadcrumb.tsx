import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  language?: "en" | "ar";
}

export default function Breadcrumb({ items, language = "en" }: BreadcrumbProps) {
  const [, navigate] = useLocation();
  const isRTL = language === "ar";

  return (
    <nav className={`flex items-center gap-2 text-sm text-gray-400 ${isRTL ? "flex-row-reverse" : ""}`}>
      <button
        onClick={() => navigate("/")}
        className="hover:text-amber-400 transition"
      >
        {language === "en" ? "Home" : "الرئيسية"}
      </button>

      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <ChevronRight size={16} className={isRTL ? "rotate-180" : ""} />
          {idx === items.length - 1 ? (
            <span className="text-amber-400">{item.label}</span>
          ) : (
            <button
              onClick={() => navigate(item.href)}
              className="hover:text-amber-400 transition"
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
