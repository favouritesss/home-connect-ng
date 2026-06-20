import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AlertTriangle, Eye, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/safety")({
  head: () => ({ meta: [
    { title: "Safety & trust — Landech" },
    { name: "description", content: "How Landech keeps you safe — from NIN verification to escrowed shortlet payments." },
  ]}),
  component: Safety,
});

function Safety() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Safety</span>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Renting safely, by design.</h1>
          <p className="mt-4 text-muted-foreground">
            Every part of Landech is built around making sure you don't get scammed,
            ghosted, or pressured into off-platform deals.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            { i: <ShieldCheck />, t: "NIN-verified hosts", b: "All landlords and agents verify their identity through NIMC. One NIN = one account, forever." },
            { i: <Lock />, t: "Shortlet escrow", b: "Shortlet payments are held by Landech via Paystack and only released to the host after check-in." },
            { i: <Eye />, t: "Traceable conversations", b: "Every enquiry routes through Landech first. Admin can review messages if anything goes wrong." },
            { i: <AlertTriangle />, t: "Report misconduct", b: "Flag any listing or message inside your dashboard. We act on reports within 24 hours." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">{x.i}</span>
              <h3 className="mt-4 font-display text-xl text-foreground">{x.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{x.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-surface p-8 md:p-12">
          <h2 className="font-display text-2xl text-foreground">Rules of the road</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <li>• Never send money outside the Landech platform for a shortlet booking.</li>
            <li>• Always inspect a long-term rental in person before paying yearly rent.</li>
            <li>• Verify the "Verified Landlord" or "Verified Agent" badge on every listing.</li>
            <li>• Report any host who asks you to move conversations to WhatsApp before an inspection.</li>
          </ul>
          <div className="mt-6">
            <Link to="/contact" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Report an issue</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
