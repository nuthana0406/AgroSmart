import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES, loc } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import SectionTitle from "@/components/SectionTitle";
import BookingModal from "@/components/BookingModal";

export default function AdvancedFarming() {
  const { t } = useLanguage();
  const [bookService, setBookService] = useState(null);
  return (
    <div>
      <SectionTitle eyebrow={t("advancedFarming")} title={t("advancedFarmingSection")} />
      <p className="text-sm text-muted-foreground mb-6 -mt-4 max-w-2xl">{t("advFarmingDesc")}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} onBook={setBookService} />
        ))}
      </div>
      <BookingModal service={bookService} open={!!bookService} onClose={() => setBookService(null)} />
    </div>
  );
}