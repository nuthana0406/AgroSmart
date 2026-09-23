import React from "react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { loc } from "@/data/services";
import { BadgeCheck, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceCard({ service, onBook }) {
  const { lang, t } = useLanguage();
  const fromPrice = service.durations[0].price;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={service.image}
          alt={loc(service.name, lang)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-primary backdrop-blur">
          <BadgeCheck className="w-3.5 h-3.5" /> {t("provider")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">{loc(service.name, lang)}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{loc(service.desc, lang)}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <BadgeCheck className="w-3.5 h-3.5 text-primary" /> {service.provider}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" /> {service.location}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{t("availableDuration")}</p>
            <p className="text-lg font-bold text-foreground">₹{fromPrice} <span className="text-xs font-normal text-muted-foreground">/ {t(service.durations[0].key)}</span></p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="h-9" onClick={() => onBook(service)}>
            {t("serviceDetails")}
          </Button>
          <Button size="sm" className="h-9 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => onBook(service)}>
            {t("bookNow")} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}