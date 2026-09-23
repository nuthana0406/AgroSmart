import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BOOTHS } from "@/data/booths";
import { Button } from "@/components/ui/button";
import { Store, MapPin, Phone, HelpCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function VillageBooth() {
  const { t } = useLanguage();
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-4">{t("boothTitle")}</h1>
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary booth-pulse shrink-0"><Store className="w-6 h-6" /></span>
          <div>
            <p className="text-muted-foreground leading-relaxed">{t("boothDesc")}</p>
            <p className="mt-3 text-xs text-muted-foreground italic">{t("boothNote")}</p>
          </div>
        </div>
      </div>

      <h2 className="font-heading text-xl font-semibold mb-4">{t("boothLocation")}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BOOTHS.map((b) => (
          <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="inline-flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-primary" /> {b.location}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("boothAssistant")}: {b.assistant}</p>
            <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {b.contact}</p>
            <Button size="sm" variant="outline" className="mt-4 w-full gap-2" onClick={() => toast({ title: t("getAssistance"), description: b.assistant })}>
              <HelpCircle className="w-4 h-4" /> {t("getAssistance")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}