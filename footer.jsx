import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sprout, MapPin, Store } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/home" className="flex items-center gap-2 mb-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sprout className="w-5 h-5" />
              </span>
              <span className="font-heading text-xl font-semibold">
                Agro<span className="text-primary">Smart</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{t("footerAbout")}</p>
            <p className="mt-3 text-sm font-medium text-foreground/80">{t("tagline")}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{t("home")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/seeds" className="hover:text-primary">{t("seeds")}</Link></li>
              <li><Link to="/fertilizers" className="hover:text-primary">{t("fertilizers")}</Link></li>
              <li><Link to="/crop-protection" className="hover:text-primary">{t("cropProtection")}</Link></li>
              <li><Link to="/advanced-farming" className="hover:text-primary">{t("advancedFarming")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{t("about")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/village-booth" className="hover:text-primary inline-flex items-center gap-1.5"><Store className="w-4 h-4 booth-pulse rounded-full p-0.5 bg-primary/10 text-primary" />{t("villageBoothSection")}</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary">{t("marketplace")}</Link></li>
              <li><Link to="/weather" className="hover:text-primary">{t("weather")}</Link></li>
              <li><Link to="/account" className="hover:text-primary">{t("account")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="horizon-line my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} AgroSmart. {t("rights")}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer">{t("privacy")}</span>
            <span className="hover:text-primary cursor-pointer">{t("terms")}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}