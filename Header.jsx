import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Sprout, ShoppingCart, Search, Menu, X, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

export default function Header({ onSearch }) {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState("");

  const navItems = [
    { to: "/home", label: t("home") },
    { to: "/seeds", label: t("seeds") },
    { to: "/fertilizers", label: t("fertilizers") },
    { to: "/crop-protection", label: t("cropProtection") },
    { to: "/advanced-farming", label: t("advancedFarming") },
    { to: "/weather", label: t("weather") },
    { to: "/marketplace", label: t("marketplace") },
    { to: "/orders", label: t("orders") },
    { to: "/account", label: t("account") },
  ];

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch?.(q);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/home" className="flex items-center gap-2 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Sprout className="w-5 h-5" />
            </span>
            <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Agro<span className="text-primary">Smart</span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="pl-10 h-10 rounded-full bg-secondary/60 border-transparent focus-visible:border-primary"
              />
            </div>
          </form>

          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/notifications" className="hidden sm:grid place-items-center h-9 w-9 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative grid place-items-center h-9 w-9 rounded-full hover:bg-secondary text-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="hidden sm:block">
              <LanguageSwitcher compact />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              className="hidden sm:flex gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">{t("logout")}</span>
            </Button>
            <button
              className="xl:hidden grid place-items-center h-9 w-9 rounded-lg hover:bg-secondary"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden pb-4 border-t border-border/60 pt-3 space-y-1">
            <form onSubmit={submitSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPlaceholder")} className="pl-10 h-10" />
              </div>
            </form>
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 pt-2">
              <LanguageSwitcher compact />
              <Button variant="ghost" size="sm" onClick={() => logout()} className="gap-2">
                <LogOut className="w-4 h-4" /> {t("logout")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}