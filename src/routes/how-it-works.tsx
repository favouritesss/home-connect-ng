import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Search, MessageSquare, KeyRound, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Landech works, Trusted renting in Lagos" },
      { name: "description", content: "Browse, enquire, and rent, with Landech as the trusted middleman. Here's exactly how it works." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { icon: Search, title: "1. Browse verified rentals", body: "Filter by area, type, beds, and budget. Every listing shows fees up front." },
  { icon: MessageSquare, title: "2. Enquire through Landech", body: "Your message goes to us first, then to the landlord or agent. No one disappears." },
  { icon: ShieldCheck, title: "3. Chat safely inside Landech", body: "All replies stay in your inbox. Admins can see the trail if anything goes wrong." },
  { icon: KeyRound, title: "4. Move in with confidence", body: "Long-term rent is paid to the landlord directly. Shortlets are paid securely via Paystack." },
];

function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            How it works
          </span>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">
            Renting in Lagos, the way it should be.
          </h1>
          <p className="mt-4 text-muted-foreground">
            We sit between renters and hosts so deals stay honest. No hidden fees,
            no ghosting, no inflated agent commissions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl bg-surface p-8 md:grid-cols-3 md:p-12">
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl text-foreground">For hosts</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Two account types, clear rules.
            </p>
          </div>
          <div className="md:col-span-2 grid gap-5 sm:grid-cols-2">
            <HostCard
              tag="Landlord"
              price="Free"
              points={["Post your own property", "Direct from Landlord badge", "ID + property docs verified"]}
            />
            <HostCard
              tag="Agent"
              price="From ₦0/mo"
              points={["Basic plan free (3 listings)", "Verified plan ₦5,000/mo, unlimited listings", "₦10,000 closure fee per closed deal"]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/listings" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Browse rentals
          </Link>
          <Link to="/signup" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">
            List a property
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function HostCard({ tag, price, points }: { tag: string; price: string; points: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">{tag}</span>
        <span className="font-display text-lg text-foreground">{price}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {points.map((p) => (
          <li key={p} className="flex gap-2"><span className="text-primary">•</span>{p}</li>
        ))}
      </ul>
    </div>
  );
}
