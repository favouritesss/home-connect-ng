import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Fees & pricing, Landech" },
    { name: "description", content: "Transparent pricing for tenants, landlords, and agents. No hidden fees, ever." },
  ]}),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Pricing</span>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Honest pricing, on every side of the deal.</h1>
          <p className="mt-4 text-muted-foreground">
            One transaction, one fee. We never stack a posting fee on top of a success fee.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <PricingCard
            title="Tenants"
            price="₦0"
            tag="Always free"
            description="Browse, message, and rent. Landech is free for renters, forever."
            features={["Unlimited search", "Verified listings only", "Safe middleman messaging", "Shortlet escrow protection"]}
            cta="Browse rentals"
            to="/listings"
          />
          <PricingCard
            title="Landlords"
            price="₦0"
            tag="List free, forever"
            description="Post your own property. No agency fees. Direct from Landlord badge."
            features={["Unlimited listings", "Verified Landlord badge", "Direct enquiries from renters", "Dashboard analytics"]}
            cta="Become a landlord"
            to="/for-landlords"
            highlight
          />
          <PricingCard
            title="Agents"
            price="From ₦0/mo"
            tag="Basic free · Verified ₦5,000/mo"
            description="Start free with 3 listings. Upgrade for unlimited listings, badge & priority placement."
            features={["Verified Agent badge", "Unlimited listings (Verified)", "Priority in search results", "₦10,000 closure fee per closed yearly deal"]}
            cta="Become an agent"
            to="/for-agents"
          />
        </div>

        <div className="mt-14 rounded-3xl bg-surface p-8 md:p-12">
          <h2 className="font-display text-2xl text-foreground">Shortlet payments</h2>
          <p className="mt-2 text-muted-foreground">All shortlet bookings are processed via Paystack. Landech keeps 10%; 90% goes to the host on check-in.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-4">Per-night price</th>
                  <th className="py-2 pr-4">Landech keeps (10%)</th>
                  <th className="py-2">Host receives (90%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {[[10000,1000,9000],[20000,2000,18000],[50000,5000,45000],[100000,10000,90000]].map(([p,l,h]) => (
                  <tr key={p}>
                    <td className="py-3 pr-4">₦{p.toLocaleString()}</td>
                    <td className="py-3 pr-4">₦{l.toLocaleString()}</td>
                    <td className="py-3">₦{h.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function PricingCard({ title, price, tag, description, features, cta, to, highlight }: {
  title: string; price: string; tag: string; description: string; features: string[]; cta: string; to: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border bg-card p-6 shadow-soft ${highlight ? "border-primary ring-2 ring-primary/30" : "border-border"}`}>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tag}</div>
      <div className="mt-2 font-display text-2xl text-foreground">{title}</div>
      <div className="mt-2 font-display text-4xl text-primary">{price}</div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-5 space-y-2 text-sm text-foreground">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
        ))}
      </ul>
      <Link to={to} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{cta}</Link>
    </div>
  );
}
