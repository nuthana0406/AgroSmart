import React, { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { productsByCategory, loc } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Catalog({ category, titleKey, eyebrowKey }) {
  const { lang, t } = useLanguage();
  const [q, setQ] = useState("");
  const all = useMemo(() => productsByCategory(category), [category]);
  const items = useMemo(() => {
    if (!q.trim()) return all;
    const s = q.toLowerCase();
    return all.filter((p) => loc(p.name, lang).toLowerCase().includes(s) || loc(p.desc, lang).toLowerCase().includes(s));
  }, [q, all, lang]);

  return (
    <div>
      <SectionTitle eyebrow={t(eyebrowKey)} title={t(titleKey)} />
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPlaceholder")} className="pl-10" />
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">{t("loading")}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}