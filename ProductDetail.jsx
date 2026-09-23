import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { getProduct, loc, HERO_IMAGE } from "@/data/products";
import { BOOTHS } from "@/data/booths";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Store, Minus, Plus, ShoppingCart, Zap, ArrowLeft, Droplets, FlaskConical, Sprout } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/home">{t("back")}</Link></Button>
      </div>
    );
  }

  const isSeed = product.category === "seeds";

  const handleAdd = () => { addToCart(product, qty); toast({ title: t("addToCart"), description: loc(product.name, lang) }); };
  const handleBuy = () => { addToCart(product, qty); navigate("/checkout"); };

  return (
    <div>
      <Link to="/home" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> {t("back")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary aspect-square">
          <Image src={product.image} alt={loc(product.name, lang)} className="h-full w-full object-cover" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
            <BadgeCheck className="w-4 h-4" /> {t("verifiedSeller")}
          </span>
        </div>

        <div>
          <p className="section-eyebrow mb-2">{t(product.category === "seeds" ? "seeds" : product.category === "fertilizers" ? "fertilizers" : "cropProtection")}</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">{loc(product.name, lang)}</h1>
          <p className="mt-2 text-muted-foreground">{loc(product.desc, lang)}</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-heading text-4xl font-bold">₹{product.price}</span>
            <span className="text-sm text-muted-foreground pb-1">{product.packSize}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{t("demoPriceNote")}</p>

          {/* Demo price gauge */}
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-primary/30 via-primary to-accent" />
            <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
              <span>₹{Math.round(product.price * 0.85)}</span><span>₹{product.price}</span><span>₹{Math.round(product.price * 1.2)}</span>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Spec label={t("cropType")} value={loc(product.cropType, lang)} />
            <Spec label={t("season")} value={loc(product.season, lang)} />
            <Spec label={t("packSize")} value={product.packSize} />
            <Spec label={t("manufacturer")} value={product.manufacturer} />
            <Spec label={t("verifiedSeller")} value={product.seller} />
            <Spec label={t("delivery")} value={product.delivery} />
            <Spec label={t("availability")} value={product.availability === "in" ? t("inStock") : t("outOfStock")} />
          </dl>

          {isSeed && (
            <div className="mt-5 grid grid-cols-3 gap-3">
              <GrowthSpec icon={FlaskConical} label="Soil pH" value={product.soilPh} />
              <GrowthSpec icon={Droplets} label="Water" value={product.water} />
              <GrowthSpec icon={Sprout} label="Germination" value={product.germination} />
            </div>
          )}

          {product.note && (
            <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-3 text-xs text-accent-foreground">{product.note}</p>
          )}

          {/* Booth map card */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Store className="w-5 h-5" /></span>
            <div className="text-sm">
              <p className="font-medium">{t("villageBoothSection")} — {BOOTHS[0].location}</p>
              <p className="text-muted-foreground">{BOOTHS[0].assistant} · {BOOTHS[0].contact}</p>
            </div>
            <Button asChild variant="outline" size="sm" className="ml-auto"><Link to="/village-booth">{t("getAssistance")}</Link></Button>
          </div>

          {/* Qty + actions */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center hover:bg-secondary rounded-l-full"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center hover:bg-secondary rounded-r-full"><Plus className="w-4 h-4" /></button>
            </div>
            <Button onClick={handleAdd} variant="secondary" className="gap-2"><ShoppingCart className="w-4 h-4" /> {t("addToCart")}</Button>
            <Button onClick={handleBuy} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"><Zap className="w-4 h-4" /> {t("buyNow")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
function GrowthSpec({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center">
      <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}