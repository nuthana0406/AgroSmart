import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { getProduct, loc } from "@/data/products";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

export default function Cart() {
  const { t, lang } = useLanguage();
  const { items, updateQty, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-muted-foreground mb-4"><ShoppingCart className="w-8 h-8" /></span>
        <h2 className="font-heading text-2xl font-semibold">{t("cartEmpty")}</h2>
        <p className="mt-1 text-muted-foreground">{t("cartEmptyMsg")}</p>
        <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"><Link to="/seeds">{t("seeds")} <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-6">{t("cartTitle")}</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <Link to={`/product/${it.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                <Image src={it.image} alt={it.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/product/${it.id}`} className="font-heading font-semibold hover:text-primary">{(() => { const p = getProduct(it.id); return p ? loc(p.name, lang) : it.name; })()}</Link>
                    <p className="text-xs text-muted-foreground">{it.packSize} · {t("delivery")}: 3–5 days</p>
                  </div>
                  <button onClick={() => removeFromCart(it.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button onClick={() => updateQty(it.id, it.qty - 1)} className="grid h-8 w-8 place-items-center hover:bg-secondary rounded-l-full"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                    <button onClick={() => updateQty(it.id, it.qty + 1)} className="grid h-8 w-8 place-items-center hover:bg-secondary rounded-r-full"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <span className="font-semibold">₹{it.price * it.qty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit">
          <h2 className="font-heading text-lg font-semibold mb-4">{t("orderSummary")}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("subtotal")}</span><span>₹{cartTotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("deliveryFee")}</span><span className="text-primary">Free</span></div>
            <div className="horizon-line my-3" />
            <div className="flex justify-between text-base font-semibold"><span>{t("totalAmount")}</span><span>₹{cartTotal}</span></div>
          </div>
          <Button onClick={() => navigate("/checkout")} className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">{t("proceedCheckout")}</Button>
        </div>
      </div>
    </div>
  );
}