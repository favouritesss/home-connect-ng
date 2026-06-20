import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Sparkles, MessageSquare, ArrowRight, MapPin, BadgeCheck, Wallet } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { LocationSearch } from "@/components/site/LocationSearch";
import { LISTINGS, PROPERTY_TYPES } from "@/lib/listings";
import { NIGERIA } from "@/lib/nigeria";
import heroImg from "@/assets/hero-lagos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Landech — Rent verified homes anywhere in Nigeria" },
      { name: "description", content: "Find verified apartments, self-cons and shortlets across all 36 states + FCT. No hidden fees. Landech handles every enquiry safely." },
      { property: "og:title", content: "Landech — Rent verified homes anywhere in Nigeria" },
      { property: "og:description", content: "Verified landlords and agents. Honest fees. Real-time location search across all 774 LGAs." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [type, setType] = useState<"long-term" | "shortlet" | "">("");
  const [pickedState, setPickedState] = useState<string | undefined>(undefined);
  const [pickedArea, setPickedArea] = useState<string | undefined>(undefined);

  const featured = LISTINGS.slice(0, 6);
  const totalListings = LISTINGS.length;
  const totalStates = new Set(LISTINGS.map((l) => l.state)).size;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/listings",
      search: {
        state: pickedState,
        area: pickedArea,
        q: !pickedState && location ? location : undefined,
        propertyType: (propertyType || undefined) as never,
        type: (type || undefined) as never,
      },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern Nigerian apartment building at golden hour" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/45 to-foreground/75" />
        </div>

        <div className="container-page relative py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Live in {totalStates}+ states · all 774 LGAs searchable
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-background sm:text-5xl md:text-6xl">
              Find your next home anywhere in Nigeria — without the runaround.
            </h1>
            <p className="mt-5 max-w-xl text-base text-background/85 md:text-lg">
              Verified landlords and agents from Lagos to Maiduguri, Kano to Calabar.
              Honest fees. Every enquiry passes through Landech, so you're never ghosted.
            </p>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-10 grid gap-2 rounded-2xl bg-background p-3 shadow-lift md:max-w-5xl md:grid-cols-[1.4fr_1fr_1fr_auto]"
          >
            <div className="rounded-xl px-3 py-2 hover:bg-muted">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Where</div>
              <LocationSearch
                value={location}
                onChange={(v) => { setLocation(v); setPickedState(undefined); setPickedArea(undefined); }}
                onSelect={(loc) => { setPickedState(loc.state); setPickedArea(loc.lga); }}
                placeholder="Any city, town, or LGA in Nigeria"
              />
            </div>
            <label className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Property type</span>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="bg-transparent text-sm font-medium text-foreground outline-none">
                <option value="">Any type</option>
                {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Rental</span>
              <select value={type} onChange={(e) => setType(e.target.value as "long-term" | "shortlet" | "")} className="bg-transparent text-sm font-medium text-foreground outline-none">
                <option value="">Long-term & shortlet</option>
                <option value="long-term">Long-term (yearly)</option>
                <option value="shortlet">Shortlet (per night)</option>
              </select>
            </label>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-background/80">
            <span>Popular:</span>
            {["Lekki, Lagos", "Wuse, FCT - Abuja", "Port Harcourt, Rivers", "Ibadan North, Oyo", "Enugu North, Enugu"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setLocation(s)}
                className="text-background/95 hover:underline"
              >{s}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border/60 bg-surface">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3">
          <TrustItem icon={<ShieldCheck className="h-5 w-5" />} title="Verified landlords & agents" body="Every host submits NIN, ID and property documents before they can list." />
          <TrustItem icon={<MessageSquare className="h-5 w-5" />} title="Landech as middleman" body="Enquiries route through us. No one disappears, no one drags you offline." />
          <TrustItem icon={<Wallet className="h-5 w-5" />} title="Honest fees, upfront" body="Agency fees and caution deposits are shown on every listing — before you reach out." />
        </div>
      </section>

      {/* States grid */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">Search by state</h2>
            <p className="mt-2 text-muted-foreground">From the South-South to the North-West — all 36 states + FCT.</p>
          </div>
          <Link to="/listings" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            See all listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {NIGERIA.map((s) => (
            <Link
              key={s.state}
              to="/listings"
              search={{ state: s.state }}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary" /> {s.lgas.length} LGAs
              </div>
              <div className="mt-1 font-display text-base text-foreground group-hover:text-primary">{s.state}</div>
              <div className="text-[11px] text-muted-foreground">{s.capital}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-page pb-4 md:pb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">Fresh on Landech</h2>
            <p className="mt-2 text-muted-foreground">{totalListings} verified homes available across Nigeria right now.</p>
          </div>
          <Link to="/listings" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* Why Landech */}
      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <BadgeCheck className="h-3 w-3" /> Why Landech
            </span>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">A renting experience built around trust.</h2>
            <p className="mt-4 text-muted-foreground">
              Nigerian renting has been broken for too long — inflated agent fees, ghosted enquiries,
              fake listings. Landech is rebuilding it from scratch around verified people, real prices,
              and transparent communication.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/how-it-works" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">How it works</Link>
              <Link to="/about" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">About Landech</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "₦0 to list", d: "Landlords post for free, forever." },
              { t: "Capped fees", d: "Agency fees are bounded and disclosed up front." },
              { t: "Refundable shortlets", d: "Paystack-secured payments. Full refund if a host cancels." },
              { t: "Real identities", d: "NIMC NIN verification is non-negotiable for hosts." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card p-5">
                <div className="font-display text-xl text-primary">{b.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:px-14 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Own a property? List it free.</h2>
              <p className="mt-3 max-w-lg text-primary-foreground/80">
                Landlords post for ₦0. Agents start free, upgrade when they're ready to grow.
                Reach serious renters across every Nigerian state.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/signup" className="rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-95">Get started</Link>
              <Link to="/for-agents" className="rounded-xl border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">For agents</Link>
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
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      <div>
        <h3 className="font-display text-lg text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
