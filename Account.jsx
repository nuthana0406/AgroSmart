import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { User, Package, CalendarCheck, Globe, LogOut, Mail, Phone, MapPin } from "lucide-react";

export default function Account() {
  const { t, lang } = useLanguage();
  const { user, logout } = useAuth();
  const [counts, setCounts] = useState({ orders: 0, bookings: 0 });

  useEffect(() => {
    (async () => {
      try {
        const orders = await base44.entities.Order.filter({}, "-created_date", 1);
        const bookings = await base44.entities.Booking.filter({}, "-created_date", 1);
        setCounts({ orders: orders.length, bookings: bookings.length });
      } catch {}
    })();
  }, []);

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-6">{t("accountTitle")}</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary"><User className="w-8 h-8" /></span>
            <div>
              <h2 className="font-heading text-xl font-semibold">{user?.full_name || "AgroSmart Farmer"}</h2>
              <p className="text-sm text-muted-foreground">{t("farmerProfile")}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Info icon={User} label={t("name")} value={user?.full_name || "—"} />
            <Info icon={Mail} label={t("email")} value={user?.email || "—"} />
            <Info icon={Phone} label={t("mobile")} value="—" />
            <Info icon={MapPin} label={t("address")} value="—" />
          </div>
          <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-xs text-muted-foreground mb-2">{t("savedPreferences")}</p>
            <p className="inline-flex items-center gap-2 text-sm font-medium"><Globe className="w-4 h-4 text-primary" /> {t("language")}: {lang === "en" ? "English" : lang === "te" ? "తెలుగు" : "हिन्दी"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/orders" className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
            <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Package className="w-5 h-5" /></span><span className="font-medium">{t("myOrders")}</span></span>
            <span className="text-muted-foreground">{counts.orders}</span>
          </Link>
          <Link to="/account" className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
            <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><CalendarCheck className="w-5 h-5" /></span><span className="font-medium">{t("myBookings")}</span></span>
            <span className="text-muted-foreground">{counts.bookings}</span>
          </Link>
          <Button onClick={() => logout()} variant="outline" className="w-full gap-2"><LogOut className="w-4 h-4" /> {t("logout")}</Button>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="w-3.5 h-3.5" /> {label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}