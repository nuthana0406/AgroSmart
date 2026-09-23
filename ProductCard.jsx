import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { loc } from "@/data/products";
import { BadgeCheck, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({ title: t("addToCart"), description: loc(product.name, lang) });
  };

  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate("/checkout");
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={loc(product.name, lang)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-primary backdrop-blur">
          <BadgeCheck className="w-3.5 h-3.5" /> {t("verifiedSeller")}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-[11px] font-medium text-background backdrop-blur">
          {product.packSize}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground line-clamp-2 hover:text-primary">
            {loc(product.name, lang)}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{loc(product.desc, lang)}</p>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <div><dt className="inline font-medium text-foreground/70">{t("cropType")}: </dt><dd className="inline">{loc(product.cropType, lang)}</dd></div>
          <div><dt className="inline font-medium text-foreground/70">{t("season")}: </dt><dd className="inline">{loc(product.season, lang)}</dd></div>
          <div><dt className="inline font-medium text-foreground/70">{t("manufacturer")}: </dt><dd className="inline">{product.manufacturer}</dd></div>
          <div><dt className="inline font-medium text-foreground/70">{t("delivery")}: </dt><dd className="inline">{product.delivery}</dd></div>
        </dl>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">₹{product.price}</p>
            <p className="text-[10px] text-muted-foreground">{t("demoPriceNote")}</p>
          </div>
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${product.availability === "in" ? "text-primary" : "text-destructive"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${product.availability === "in" ? "bg-primary" : "bg-destructive"}`} />
            {product.availability === "in" ? t("inStock") : t("outOfStock")}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm" className="h-9">
            <Link to={`/product/${product.id}`}>{t("viewDetails")}</Link>
          </Button>
          <Button onClick={handleAdd} variant="secondary" size="sm" className="h-9 gap-1.5">
            <ShoppingCart className="w-4 h-4" /> {t("addToCart")}
          </Button>
        </div>
        <Button onClick={handleBuy} size="sm" className="mt-2 h-9 w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
          <Zap className="w-4 h-4" /> {t("buyNow")}
        </Button>
      </div>
    </div>
  );
}import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { loc } from "@/data/products";
import { BadgeCheck, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({ title: t("addToCart"), description: loc(product.name, lang) });
  };

  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate("/checkout");
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={loc(product.name, lang)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-primary backdrop-blur">
          <BadgeCheck className="w-3.5 h-3.5" /> {t("verifiedSeller")}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-[11px] font-medium text-background backdrop-blur">
          {product.packSize}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground line-clamp-2 hover:text-primary">
            {loc(product.name, lang)}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{loc(product.desc, lang)}</p>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <div><dt className="inline font-medium text-foreground/70">{t("cropType")}: </dt><dd className="inline">{loc(product.cropType, lang)}</dd></div>
          <div><dt className="inline font-medium text-foreground/70">{t("season")}: </dt><dd className="inline">{loc(product.season, lang)}</dd></div>
          <div><dt className="inline font-medium text-foreground/70">{t("manufacturer")}: </dt><dd className="inline">{product.manufacturer}</dd></div>
          <div><dt className="inline font-medium text-foreground/70">{t("delivery")}: </dt><dd className="inline">{product.delivery}</dd></div>
        </dl>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">₹{product.price}</p>
            <p className="text-[10px] text-muted-foreground">{t("demoPriceNote")}</p>
          </div>
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${product.availability === "in" ? "text-primary" : "text-destructive"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${product.availability === "in" ? "bg-primary" : "bg-destructive"}`} />
            {product.availability === "in" ? t("inStock") : t("outOfStock")}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm" className="h-9">
            <Link to={`/product/${product.id}`}>{t("viewDetails")}</Link>
          </Button>
          <Button onClick={handleAdd} variant="secondary" size="sm" className="h-9 gap-1.5">
            <ShoppingCart className="w-4 h-4" /> {t("addToCart")}
          </Button>
        </div>
        <Button onClick={handleBuy} size="sm" className="mt-2 h-9 w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
          <Zap className="w-4 h-4" /> {t("buyNow")}
        </Button>
      </div>
    </div>
  );
}