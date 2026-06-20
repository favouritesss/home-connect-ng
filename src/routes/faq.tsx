import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Landech" },
      { name: "description", content: "Answers to the most common questions tenants, landlords, and agents ask about Landech." },
    ],
  }),
  component: FAQPage,
});

const FAQS: { q: string; a: string }[] = [
  { q: "Is Landech free for renters?", a: "Yes. Renters never pay Landech anything — searching, viewing listings, and enquiring are completely free." },
  { q: "Where does Landech operate?", a: "Landech is live across all 36 Nigerian states and the FCT. You can search by any town, city or LGA." },
  { q: "How are landlords and agents verified?", a: "Hosts must submit a valid NIN (verified through NIMC), a selfie with their NIN card, plus property ownership documents. Agents may also provide CAC certificates." },
  { q: "Why must enquiries go through Landech?", a: "We sit between renters and hosts so every conversation is traceable. This protects you from scams, ghosting, and offline pressure tactics from agents." },
  { q: "How are yearly rents paid?", a: "Yearly rent is paid directly to the landlord or agent — we don't hold large sums. The agent then logs the closed deal and pays Landech a ₦10,000 closure fee." },
  { q: "How are shortlets paid?", a: "All shortlet bookings are processed through Paystack on the platform. We hold the funds, deduct a 10% fee on check-in, and remit 90% to the host. Full refund if the host cancels." },
  { q: "What if a host cancels my shortlet booking?", a: "You get a full automatic refund. Repeated cancellations result in the host being suspended." },
  { q: "Can I have both a landlord and agent account?", a: "Not in Phase 1 — each account is one role only. This keeps verification and accountability clean." },
  { q: "How does the referral bonus work?", a: "You earn ₦5,000 for every 8 successful yearly rent referrals, and ₦5,000 for every 20 successful shortlet referrals. Only completed deals count." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">FAQ</span>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Questions, answered.</h1>
          <p className="mt-4 text-muted-foreground">If you can't find what you're looking for, message us — we read everything.</p>
        </div>

        <div className="mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/60"
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}
