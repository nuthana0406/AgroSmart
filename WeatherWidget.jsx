import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CloudRain, Droplets, Wind, Thermometer, Cloud, Sun, Cloudy, Percent, AlertTriangle } from "lucide-react";

const HOURS = [
  { h: "Now", t: 29, icon: Sun },
  { h: "1 PM", t: 30, icon: Sun },
  { h: "2 PM", t: 31, icon: Cloudy },
  { h: "3 PM", t: 30, icon: Cloud },
  { h: "4 PM", t: 28, icon: CloudRain },
  { h: "5 PM", t: 27, icon: CloudRain },
];

export default function WeatherWidget() {
  const { t } = useLanguage();
  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <CloudRain className="w-9 h-9" />
          </div>
          <div>
            <p className="section-eyebrow">{t("currentWeather")}</p>
            <p className="font-heading text-3xl font-semibold">29°C <span className="text-base font-normal text-muted-foreground">{t("partlyCloudy")}</span></p>
            <p className="text-sm text-muted-foreground">{t("weatherLocation")}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          <Metric icon={Thermometer} label={t("temperature")} value="29°C" />
          <Metric icon={Percent} label={t("rainProbability")} value="62%" />
          <Metric icon={Droplets} label={t("humidity")} value="74%" />
          <Metric icon={Wind} label={t("wind")} value="12 km/h" />
          <Metric icon={Cloud} label={t("nextDayForecast")} value="27°C" />
          <Metric icon={Sun} label={t("uvIndex")} value={t("uvModerate")} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{t("hourlyForecast")}</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {HOURS.map((h) => (
            <div key={h.h} className="flex min-w-16 flex-col items-center gap-1 rounded-xl border border-border bg-background/60 px-3 py-2.5">
              <span className="text-[11px] text-muted-foreground">{h.h}</span>
              <h.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">{h.t}°</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm text-accent-foreground">
        <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <p><span className="font-semibold">{t("farmingAlerts")}: </span>{t("rainAlert")}</p>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Icon className="w-3.5 h-3.5" /> {label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}