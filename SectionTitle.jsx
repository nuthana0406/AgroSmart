import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="section-eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}