import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Check, Star, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/for-agents")({
  head: () => ({ meta: [
    { title: "Grow your agency on Landech, for agents" },
    { name: "description", content: "Start free with 3 listings or go Verified at ₦5,000/month for unlimited listings, badge, and priority placement." },
  ]}),
  component: ForAgents,
});

function ForAgents() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">For agents</span>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Build a real agency on a platform renters trust.</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Stop chasing dead-end WhatsApp leads. Landech sends you renters who already
            saw your declared fees, photos, and verification badge, and chose to enquire.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Plan
            tag="Basic"
            price="₦0/mo"
            features={["Up to 3 active listings", "Standard search visibility", "Basic dashboard", "Middleman messaging"]}
          />
          <Plan
            tag="Verified"
            price="₦5,000/mo"
            highlight
            features={["Unlimited active listings", "Verified Agent badge", "Priority in search results", "Faster enquiry routing", "Profile featured to renters"]}
          />
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl bg-surface p-8 md:grid-cols-2 md:p-12">
          <div>
            <div className="flex items-center gap-2 text-primary"><Star className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wide">One fee, one deal</span></div>
            <h2 className="mt-2 font-display text-2xl text-foreground">₦10,000 closure fee per closed yearly rent</h2>
            <p className="mt-3 text-muted-foreground">
              Yearly rent is paid offline directly to you. Once the deal closes, mark it as
              closed in your dashboard, we auto-invoice ₦10,000 via Paystack. No posting fees.
              No surprises.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary"><TrendingUp className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wide">Why renters pay less with you</span></div>
            <h2 className="mt-2 font-display text-2xl text-foreground">Cap agent fee at 30% to win more deals</h2>
            <p className="mt-3 text-muted-foreground">
              Traditional ₦50,000 → On Landech ₦30,000 + ₦10,000 to Landech = ₦40,000 to the renter.
              Cheaper for the renter, attractive against street agents, and you still earn well.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-destructive/20 bg-destructive/5 p-6 md:p-8">
          <h3 className="font-display text-xl text-foreground">One NIN, one account, forever.</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            To keep the platform safe and fair, every agent verifies their NIN through NIMC.
            Unpaid closure fees blacklist the NIN, preventing new accounts. This protects honest
            agents from being undercut by bad actors.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/signup" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Create agent account</Link>
          <Link to="/pricing" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">Full pricing</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Plan({ tag, price, features, highlight }: { tag: string; price: string; features: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-card p-6 shadow-soft ${highlight ? "border-primary ring-2 ring-primary/30" : "border-border"}`}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{tag}</span>
        <span className="font-display text-2xl text-foreground">{price}</span>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-foreground">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
        ))}
      </ul>
    </div>
  );
}
