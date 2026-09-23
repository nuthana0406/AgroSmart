import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Package, CheckCircle2, Truck, MapPin } from "lucide-react";

export default function Orders() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.Order.filter({}, "-created_date", 50);
        setOrders(list);
      } catch {
        setOrders([]);
      }
    })();
  }, []);

  const statusKey = (s) => `status_${s}`;

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-6">{t("ordersTitle")}</h1>
      {orders === null ? (
        <p className="text-muted-foreground">{t("loading")}</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">{t("noOrders")}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-heading font-semibold">{o.order_number}</p>
                  <p className="text-xs text-muted-foreground">{new Date(o.created_date).toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${o.status === "delivered" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {t(statusKey(o.status))}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                {(o.items || []).slice(0, 4).map((it, i) => (
                  <span key={i}>{it.name} × {it.qty}</span>
                ))}
                {(o.items || []).length > 4 && <span>+{o.items.length - 4}</span>}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold">₹{o.total}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setTrack(o)}>{t("trackOrder")}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!track} onOpenChange={(v) => !v && setTrack(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("trackOrder")} — {track?.order_number}</DialogTitle>
            <DialogDescription>{new Date(track?.created_date || Date.now()).toLocaleString()}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {[
              { icon: CheckCircle2, label: t("status_confirmed"), done: true },
              { icon: Package, label: t("status_shipped"), done: track?.status === "shipped" || track?.status === "delivered" },
              { icon: Truck, label: t("status_delivered"), done: track?.status === "delivered" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-full ${s.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}><s.icon className="w-4 h-4" /></span>
                <span className={s.done ? "font-medium" : "text-muted-foreground"}>{s.label}</span>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-secondary/40 p-3 text-sm flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <span>{track?.delivery_village}, {track?.delivery_district}, {track?.delivery_state} — {track?.delivery_pincode}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}