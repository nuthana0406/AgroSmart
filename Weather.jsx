import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import WeatherWidget from "@/components/WeatherWidget";
import AdvisoryWidget from "@/components/AdvisoryWidget";
import SectionTitle from "@/components/SectionTitle";

export default function Weather() {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow={t("weather")} title={t("weatherAdvisory")} />
      <WeatherWidget />
      <div>
        <h2 className="font-heading text-xl font-semibold mb-4">{t("cropGuidance")}</h2>
        <AdvisoryWidget />
      </div>
    </div>
  );
}