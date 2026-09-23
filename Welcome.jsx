import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Image } from "@/components/ui/image";
import { HERO_IMAGE } from "@/data/products";
import { Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Welcome() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — hero image */}
      <div className="relative hidden lg:block">
        <Image src={HERO_IMAGE} alt="Germinating seed" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 p-10 text-background">
          <p className="font-heading text-3xl font-semibold leading-tight max-w-sm">{t("tagline")}</p>
          <p className="mt-2 text-sm text-background/80 max-w-sm">Trust · Technology · Affordability · Accessibility</p>
        </div>
      </div>

      {/* Right — language + actions */}
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-12 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Sprout className="w-6 h-6" />
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight">Agro<span className="text-primary">Smart</span></span>
            </Link>
            <LanguageSwitcher compact />
          </div>

          <div className="lg:hidden mb-8 rounded-2xl overflow-hidden">
            <Image src={HERO_IMAGE} alt="Germinating seed" className="h-44 w-full object-cover" />
          </div>

          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight">{t("welcomeTitle")}</h1>
          <p className="mt-3 text-muted-foreground text-lg">{t("welcomeSub")}</p>
          <p className="mt-1 text-sm font-medium text-primary">{t("tagline")}</p>

          <p className="section-eyebrow mt-10 mb-3">{t("chooseLanguage")}</p>

          <div className="space-y-3">
            <Button asChild size="lg" className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/login">{t("loginBtn")} <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full h-12 text-base">
              <Link to="/register">{t("signupBtn")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}