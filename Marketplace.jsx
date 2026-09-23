import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Plus, MapPin, Phone } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Marketplace() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [listings, setListings] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ crop_name: "", quantity: "", price: "", location: "", contact: "" });

  const load = async () => {
    try {
      const list = await base44.entities.CropListing.filter({}, "-created_date", 50);
      setListings(list);
    } catch {
      setListings([]);
    }
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    for (const k of ["crop_name", "quantity", "price", "location"]) {
      if (!form[k]) { toast({ title: "Please fill all fields", variant: "destructive" }); return; }
    }
    try {
      await base44.entities.CropListing.create({ ...form, price: Number(form.price), seller_name: user?.full_name || "Farmer" });
      setOpen(false);
      setForm({ crop_name: "", quantity: "", price: "", location: "", contact: "" });
      load();
      toast({ title: "Crop listed" });
    } catch (err) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{t("marketplaceTitle")}</h1>
        <Button onClick={() => setOpen(true)} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4" /> {t("sellCrop")}</Button>
      </div>

      {listings === null ? (
        <p className="text-muted-foreground">{t("loading")}</p>
      ) : listings.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">{t("cropListings")}: 0</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold">{c.crop_name}</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">₹{c.price}/qtl</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.quantity}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="w-3.5 h-3.5 text-primary" /> {c.location}</p>
              <p className="text-xs text-muted-foreground">{t("sellerName")}: {c.seller_name}</p>
              {c.contact && <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="w-3.5 h-3.5" /> {c.contact}</p>}
              <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => toast({ title: t("contactInterest"), description: c.seller_name })}>{t("contactInterest")}</Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("listYourCrop")}</DialogTitle>
            <DialogDescription>{t("sellCrop")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1.5"><Label>{t("cropName")}</Label><Input value={form.crop_name} onChange={(e) => setForm({ ...form, crop_name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>{t("quantity")}</Label><Input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="10 Quintals" /></div>
              <div className="space-y-1.5"><Label>{t("expectedPrice")} (₹/qtl)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
            </div>
            <div className="space-y-1.5"><Label>{t("location")}</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>{t("contact")}</Label><Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="+91 ..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>{t("cancel")}</Button>
            <Button onClick={submit} className="bg-primary text-primary-foreground hover:bg-primary/90">{t("submit")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}