import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRODUCTS, loc, productsByCategory } from "@/data/products";
import { SERVICES } from "@/data/services";
import { BOOTHS } from "@/data/booths";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import WeatherWidget from "@/components/WeatherWidget";
import AdvisoryWidget from "@/components/AdvisoryWidget";
import SectionTitle from "@/components/SectionTitle";
import BookingModal from "@/components/BookingModal";
import { loc as svcLoc } from "@/data/services";
import { ArrowRight, Store, Bell, Tag, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lang, t } = useLanguage();
  const [bookService, setBookService] = useState(null);

  const seeds = productsByCategory("seeds").slice(0, 12);
  const ferts = productsByCategory("fertilizers");
  const cp = productsByCategory("crop-protection");

  return (
    <div className="space-y-16">
      {/* Search hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background px-6 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-5xl">{t("welcomeTitle")}</h1>
          <p className="mt-3 text-muted-foreground text-lg">{t("tagline")}</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 mx-auto max-w-xl">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background p-1.5 shadow-sm">
              <input
                placeholder={t("searchPlaceholder")}
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
              />
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">{t("search")}</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Weather & Advisory */}
      <section>
        <SectionTitle eyebrow={t("weather")} title={t("weatherAdvisory")} />
        <WeatherWidget />
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-4">{t("cropGuidanceDesc")}</p>
          <AdvisoryWidget />
        </div>
      </section>

      {/* Seeds */}
      <ProductRow title={t("seedsMarketplace")} eyebrow={t("seeds")} items={seeds} viewAllTo="/seeds" t={t} />

      {/* Fertilizers */}
      <ProductRow title={t("fertilizersMarketplace")} eyebrow={t("fertilizers")} items={ferts} viewAllTo="/fertilizers" t={t} />

      {/* Crop Protection */}
      <ProductRow title={t("cropProtectionSection")} eyebrow={t("cropProtection")} items={cp} viewAllTo="/crop-protection" t={t} />

      {/* Advanced Farming */}
      <section>
        <SectionTitle
          eyebrow={t("advancedFarming")}
          title={t("advancedFarmingSection")}
          action={<Button asChild variant="outline" size="sm"><Link to="/advanced-farming">{t("viewAll")} <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>}
        />
        <p className="text-sm text-muted-foreground mb-6 -mt-4">{t("advFarmingDesc")}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} onBook={setBookService} />
          ))}
        </div>
      </section>

      {/* Crop Guidance */}
      <section>
        <SectionTitle eyebrow={t("cropGuidance")} title={t("cropGuidance")} />
        <AdvisoryWidget />
      </section>

      {/* Farmer Marketplace preview */}
      <section>
        <SectionTitle
          eyebrow={t("marketplace")}
          title={t("farmerMarketplace")}
          action={<Button asChild variant="outline" size="sm"><Link to="/marketplace">{t("sellCrop")} <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { crop: "Paddy (Sona Masuri)", qty: "20 Quintals", price: 3200, loc: "West Godavari, AP" },
            { crop: "Maize (Yellow)", qty: "15 Quintals", price: 2100, loc: "Karimnagar, Telangana" },
            { crop: "Red Gram (Tur)", qty: "8 Quintals", price: 7200, loc: "Kalaburagi, Karnataka" },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold">{c.crop}</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">₹{c.price}/qtl</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.qty} · {c.loc}</p>
              <Button asChild size="sm" variant="outline" className="mt-4 w-full"><Link to="/marketplace">{t("contactInterest")}</Link></Button>
            </div>
          ))}
        </div>
      </section>

      {/* Village Booth */}
      <section>
        <SectionTitle eyebrow={t("villageBoothSection")} title={t("villageBoothSection")} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">{t("boothDesc")}</p>
            <p className="mt-3 text-xs text-muted-foreground italic">{t("boothNote")}</p>
            <Button asChild className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/village-booth"><Store className="w-4 h-4 mr-2" /> {t("getAssistance")}</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading font-semibold mb-3">{t("boothLocation")}</h3>
            <ul className="space-y-3">
              {BOOTHS.slice(0, 3).map((b) => (
                <li key={b.id} className="text-sm">
                  <p className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-primary" /> {b.location}</p>
                  <p className="text-muted-foreground pl-5">{b.assistant} · {b.contact}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Offers & Alerts */}
      <section>
        <SectionTitle eyebrow={t("offersAlerts")} title={t("offersAlerts")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AlertCard icon={Tag} color="primary" title={t("monsoonSale")} text={t("monsoonSaleText")} />
          <AlertCard icon={Bell} color="accent" title={t("weatherAlert")} text={t("rainAlert")} />
          <AlertCard icon={Store} color="primary" title={t("villageBoothSection")} text={t("newBoothText")} />
        </div>
      </section>

      <BookingModal service={bookService} open={!!bookService} onClose={() => setBookService(null)} />
    </div>
  );
}

function ProductRow({ title, eyebrow, items, viewAllTo, t }) {
  return (
    <section>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        action={<Button asChild variant="outline" size="sm"><Link to={viewAllTo}>{t("viewAll")} <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>}
      />
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-1 px-1">
        {items.map((p) => (
          <div key={p.id} className="min-w-[260px] max-w-[260px] snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function AlertCard({ icon: Icon, color, title, text }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className={`grid h-10 w-10 place-items-center rounded-xl mb-3 ${color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-heading font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}