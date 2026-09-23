import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { getProduct, loc } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Loader2, Truck } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PAYMENTS = [
  { key: "upi", labelKey: "upi" },
  { key: "netBanking", labelKey: "netBanking" },
  { key: "card", labelKey: "debitCreditCard" },
  { key: "cod", labelKey: "cashOnDelivery" },
  { key: "booth", labelKey: "payAtBooth" },
];

export default function Checkout() {
  const { t, lang } = useLanguage();
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.full_name || "", mobile: "", address: "", village: "", district: "", state: "", pincode: "",
  });
  const [payment, setPayment] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handlePlace = async () => {
    for (const k of ["name", "mobile", "address", "village", "district", "state", "pincode"]) {
      if (!form[k]) { toast({ title: "Please fill all fields", variant: "destructive" }); return; }
    }
    setLoading(true);
    try {
      const order_number = "AGR" + Date.now().toString().slice(-8);
      const order = await base44.entities.Order.create({
        order_number,
        items,
        total: cartTotal,
        status: "confirmed",
        payment_method: payment,
        delivery_name: form.name,
        delivery_mobile: form.mobile,
        delivery_address: form.address,
        delivery_village: form.village,
        delivery_district: form.district,
        delivery_state: form.state,
        delivery_pincode: form.pincode,
      });
      await base44.entities.Notification.create({
        type: "order", title: t("orderConfirm"), message: `${order_number} · ₹${cartTotal}`, read: false,
      });
      await base44.entities.Notification.create({
        type: "payment", title: t("paymentConfirm"), message: `${order_number} · ${t(PAYMENTS.find((p) => p.key === payment).labelKey)}`, read: false,
      });
      clearCart();
      setPlaced({ order_number, total: cartTotal, id: order.id });
    } catch (err) {
      toast({ title: "Order failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-md text-center py-16">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary mb-5"><CheckCircle2 className="w-9 h-9" /></div>
        <h1 className="font-heading text-3xl font-semibold">{t("orderPlaced")}</h1>
        <p className="mt-2 text-muted-foreground">{t("orderConfirmedMsg")}</p>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-left text-sm space-y-2">
          <div className="flex justify-between"><span className="text-muted-foreground">{t("orderNumber")}</span><span className="font-semibold">{placed.order_number}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{t("totalAmount")}</span><span className="font-semibold">₹{placed.total}</span></div>
        </div>
        <div className="mt-6 flex gap-3 justify-center">
          <Button onClick={() => navigate("/orders")} className="bg-primary text-primary-foreground hover:bg-primary/90">{t("trackOrder")}</Button>
          <Button variant="outline" onClick={() => navigate("/home")}>{t("home")}</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-center py-20 text-muted-foreground">{t("cartEmpty")}</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-6">{t("checkoutTitle")}</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold mb-4">{t("deliveryAddress")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("farmerName")} value={form.name} onChange={set("name")} />
              <Field label={t("mobileNumber")} value={form.mobile} onChange={set("mobile")} type="tel" />
              <div className="sm:col-span-2"><Field label={t("deliveryAddress")} value={form.address} onChange={set("address")} /></div>
              <Field label={t("village")} value={form.village} onChange={set("village")} />
              <Field label={t("district")} value={form.district} onChange={set("district")} />
              <Field label={t("state")} value={form.state} onChange={set("state")} />
              <Field label={t("pincode")} value={form.pincode} onChange={set("pincode")} />
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary"><Truck className="w-4 h-4" /> {t("estimatedDelivery")}: 3–5 days</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold mb-4">{t("paymentMethod")}</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <label key={p.key} className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${payment === p.key ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                  <RadioGroupItem value={p.key} />
                  <span className="text-sm font-medium">{t(p.labelKey)}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit">
          <h2 className="font-heading text-lg font-semibold mb-4">{t("orderSummary")}</h2>
          <div className="space-y-2 text-sm max-h-56 overflow-y-auto pr-1">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between">
                <span className="text-muted-foreground">{(() => { const p = getProduct(it.id); return p ? loc(p.name, lang) : it.name; })()} × {it.qty}</span>
                <span>₹{it.price * it.qty}</span>
              </div>
            ))}
          </div>
          <div className="horizon-line my-3" />
          <div className="flex justify-between text-base font-semibold"><span>{t("totalAmount")}</span><span>₹{cartTotal}</span></div>
          <Button onClick={handlePlace} disabled={loading} className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("loading")}</> : t("placeOrder")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} />
    </div>
  );
}