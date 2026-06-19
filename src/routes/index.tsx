import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { LISTINGS, LAGOS_AREAS, PROPERTY_TYPES } from "@/lib/listings";
import heroImg from "@/assets/hero-lagos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Landech — Rent in Lagos, simple and transparent" },
      { name: "description", content: "Find verified apartments and shortlets in Lagos. Trusted landlords and agents. No hidden fees." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [type, setType] = useState<"long-term" | "shortlet" | "">("");
  const featured = LISTINGS.slice(0, 6);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/listings",
      search: {
        area: area || undefined,
        propertyType: propertyType || undefined,
        type: type || undefined,
      },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Modern apartment building in Lagos at golden hour"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/40 to-foreground/70" />
        </div>

        <div className="container-page relative py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Launching in Lagos
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-background sm:text-5xl md:text-6xl">
              Find your next home in&nbsp;Lagos — without the runaround.
            </h1>
            <p className="mt-5 max-w-xl text-base text-background/85 md:text-lg">
              Verified landlords and agents. Honest fees. Every enquiry passes
              through Landech, so you're never ghosted or scammed.
            </p>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-10 grid gap-3 rounded-2xl bg-background p-3 shadow-lift sm:grid-cols-2 md:max-w-4xl md:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <label className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Area</span>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="bg-transparent text-sm font-medium text-foreground outline-none"
              >
                <option value="">Anywhere in Lagos</option>
                {LAGOS_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Property type</span>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent text-sm font-medium text-foreground outline-none"
              >
                <option value="">Any type</option>
                {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Rental</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "long-term" | "shortlet" | "")}
                className="bg-transparent text-sm font-medium text-foreground outline-none"
              >
                <option value="">Long-term & shortlet</option>
                <option value="long-term">Long-term (yearly)</option>
                <option value="shortlet">Shortlet (per night)</option>
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
            >
              <Search className="h-4 w-4" /> Search
            </button>
          </form>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border/60 bg-surface">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3">
          <TrustItem
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Verified landlords & agents"
            body="Every host submits ID and property documents before they can list."
          />
          <TrustItem
            icon={<MessageSquare className="h-5 w-5" />}
            title="Landech as middleman"
            body="Enquiries route through us. No one disappears, no one strong-arms you offline."
          />
          <TrustItem
            icon={<Sparkles className="h-5 w-5" />}
            title="Honest fees, upfront"
            body="Agency fee and caution fee are shown on every listing — before you reach out."
          />
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">Fresh on Landech</h2>
            <p className="mt-2 text-muted-foreground">A taste of homes available across Lagos right now.</p>
          </div>
          <Link
            to="/listings"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:px-14 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Own a property? List it free.</h2>
              <p className="mt-3 max-w-lg text-primary-foreground/80">
                Landlords post for ₦0. Agents start free, upgrade when they're
                ready to grow. Reach renters who are actually serious.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/signup" className="rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-95">
                Get started
              </Link>
              <Link to="/how-it-works" className="rounded-xl border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TrustItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
