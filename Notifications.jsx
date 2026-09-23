import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { base44 } from "@/api/base44Client";
import { Bell, CheckCircle2, Package, CreditCard, Truck, CalendarCheck, CloudSun, Sprout, Store } from "lucide-react";

const ICONS = {
  order: Package, payment: CreditCard, delivery: Truck, booking: CalendarCheck,
  weather: CloudSun, advisory: Sprout, market: Store,
};

export default function Notifications() {
  const { t } = useLanguage();
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.Notification.filter({}, "-created_date", 50);
        setItems(list);
      } catch {
        setItems([]);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-6">{t("notificationsTitle")}</h1>
      {items === null ? (
        <p className="text-muted-foreground">{t("loading")}</p>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-muted-foreground mb-3"><Bell className="w-7 h-7" /></span>
          <p className="text-muted-foreground">{t("noNotifications")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => {
            const Icon = ICONS[n.type] || Bell;
            return (
              <div key={n.id} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><Icon className="w-5 h-5" /></span>
                <div className="flex-1">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_date).toLocaleString()}</p>
                </div>
                {!n.read && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}