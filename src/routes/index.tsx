import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShieldCheck, Sparkles, MessageSquare, ArrowRight, BadgeCheck, Wallet, Users, Building2, Quote, Star, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { LISTINGS, PROPERTY_TYPES } from "@/lib/listings";
import { NIGERIA, STATES } from "@/lib/nigeria";
import heroImg from "@/assets/hero-lagos.jpg";

const REGIONS: { name: string; states: string[] }[] = [
  { name: "South-West", states: ["Lagos","Ogun","Oyo","Osun","Ondo","Ekiti"] },
  { name: "South-East", states: ["Anambra","Enugu","Imo","Abia","Ebonyi"] },
  { name: "South-South", states: ["Rivers","Delta","Edo","Cross River","Akwa Ibom","Bayelsa"] },
  { name: "North-Central", states: ["FCT - Abuja","Kwara","Kogi","Niger","Plateau","Benue","Nasarawa"] },
  { name: "North-West", states: ["Kaduna","Kano","Katsina","Kebbi","Sokoto","Zamfara","Jigawa"] },
  { name: "North-East", states: ["Bauchi","Borno","Adamawa","Gombe","Taraba","Yobe"] },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Landech, rent verified homes anywhere in Nigeria" },
      { name: "description", content: "Find verified apartments, self-cons and shortlets across all 36 states and FCT. No hidden fees. Landech handles every enquiry safely." },
      { property: "og:title", content: "Landech, rent verified homes anywhere in Nigeria" },
      { property: "og:description", content: "Verified landlords and agents. Honest fees. Real-time search across all 774 LGAs." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [type, setType] = useState<"long-term" | "shortlet" | "">("");
  const [bedrooms, setBedrooms] = useState("");

  const lgaOptions = useMemo(
    () => (state ? NIGERIA.find((s) => s.state === state)?.lgas ?? [] : []),
    [state]
  );

  const featured = LISTINGS.slice(0, 6);
  const totalListings = LISTINGS.length;
  const totalStates = NIGERIA.length;
  const totalLgas = NIGERIA.reduce((n, s) => n + s.lgas.length, 0);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/listings",
      search: {
        state: state || undefined,
        area: lga || undefined,
        propertyType: (propertyType || undefined) as never,
        type: (type || undefined) as never,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
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
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/65 via-foreground/50 to-foreground/80" />
        </div>

        <div className="container-page relative py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Live in all {totalStates} states, {totalLgas} LGAs searchable
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-background sm:text-5xl md:text-6xl">
              A simpler way to rent. Anywhere you call home.
            </h1>
            <p className="mt-5 max-w-xl text-base text-background/85 md:text-lg">
              Verified landlords and agents, honest fees, no ghosting.
              Every enquiry passes through Landech, safely.
            </p>
          </div>

          {/* Search panel, cascading dropdowns */}
          <form
            onSubmit={handleSearch}
            className="mt-10 rounded-2xl bg-background p-3 shadow-lift md:max-w-5xl"
          >
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
              <HeroField label="State">
                <select
                  value={state}
                  onChange={(e) => { setState(e.target.value); setLga(""); }}
                  className="hero-select"
                >
                  <option value="">All states</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </HeroField>
              <HeroField label="LGA / Area">
                <select
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  disabled={!state}
                  className="hero-select disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{state ? "Any LGA" : "Pick a state first"}</option>
                  {lgaOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </HeroField>
              <HeroField label="Property">
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="hero-select">
                  <option value="">Any type</option>
                  {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </HeroField>
              <HeroField label="Rental">
                <select value={type} onChange={(e) => setType(e.target.value as "long-term" | "shortlet" | "")} className="hero-select">
                  <option value="">Long-term & shortlet</option>
                  <option value="long-term">Long-term (yearly)</option>
                  <option value="shortlet">Shortlet (per night)</option>
                </select>
              </HeroField>
              <HeroField label="Bedrooms">
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="hero-select">
                  <option value="">Any</option>
                  {[1,2,3,4].map((n) => <option key={n} value={n}>{n}+ beds</option>)}
                </select>
              </HeroField>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-background/85">
            <span className="font-semibold text-background">Popular:</span>
            {[
              { state: "Lagos", area: "Eti Osa", label: "Lekki, Lagos" },
              { state: "FCT - Abuja", area: "Municipal Area Council", label: "Wuse, Abuja" },
              { state: "Rivers", area: "Port Harcourt", label: "Port Harcourt" },
              { state: "Oyo", area: "Ibadan North", label: "Ibadan" },
              { state: "Enugu", area: "Enugu North", label: "Enugu" },
            ].map((s) => (
              <Link
                key={s.label}
                to="/listings"
                search={{ state: s.state, area: s.area }}
                className="rounded-full bg-background/15 px-3 py-1 text-background hover:bg-background/25"
              >{s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-border/60 bg-surface">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          <Stat value={`${totalListings}+`} label="Active rentals nationwide" />
          <Stat value={`${totalStates}`} label="States covered" />
          <Stat value={`${totalLgas}`} label="LGAs searchable" />
          <Stat value="₦0" label="Cost to list a property" />
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <TrustItem icon={<ShieldCheck className="h-5 w-5" />} title="Verified landlords and agents" body="Every host submits NIN, ID and property documents before they can list." />
          <TrustItem icon={<MessageSquare className="h-5 w-5" />} title="Landech as middleman" body="Enquiries route through us. No one disappears, no one drags you offline." />
          <TrustItem icon={<Wallet className="h-5 w-5" />} title="Honest fees, upfront" body="Agency fees and caution deposits are shown on every listing, before you reach out." />
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

      {/* Region quick browse, compact replacement for the old grid */}
      <section className="container-page py-16">
        <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary-soft/60 via-surface to-background p-8 md:p-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl text-foreground md:text-4xl">Browse by region</h2>
              <p className="mt-2 text-muted-foreground">Six geopolitical zones. Tap a state to jump straight to its listings.</p>
            </div>
            <Link to="/listings" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              All listings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-foreground">{r.name}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{r.states.length} states</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.states.map((s) => (
                    <Link
                      key={s}
                      to="/listings"
                      search={{ state: s }}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works mini */}
      <section className="container-page py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <BadgeCheck className="h-3 w-3" /> How Landech works
            </span>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">From search to keys, in four simple steps.</h2>
            <p className="mt-4 text-muted-foreground">
              We sit between renters and hosts so nothing falls through the cracks. Every message and fee is on the record.
            </p>
            <Link to="/how-it-works" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Read the full guide <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ol className="space-y-4">
            {[
              { t: "Search verified homes", d: "Filter by state, LGA, property type and rental period across all of Nigeria." },
              { t: "Enquire through Landech", d: "Your message goes to us first. We notify the host and route their reply back to you." },
              { t: "Chat safely in-app", d: "All follow-up happens in our messaging system. No ghosting, no offline run-around." },
              { t: "Move in or check in", d: "Pay shortlets securely via Paystack. Yearly rent is paid offline, with the deal logged for transparency." },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                <div>
                  <div className="font-display text-lg text-foreground">{s.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Landech */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <BadgeCheck className="h-3 w-3" /> Why Landech
            </span>
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">A renting experience built around trust.</h2>
            <p className="mt-4 text-muted-foreground">
              Nigerian renting has been broken for too long. Inflated agent fees, ghosted enquiries,
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

      {/* Testimonials */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">Stories from real renters</h2>
            <p className="mt-2 text-muted-foreground">Early users from across the country sharing how Landech changed their search.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { q: "I found a self-con near UNILAG in two days. The agent was real, the rent was exactly what was listed.", n: "Chinedu, Yaba", r: "Tenant" },
            { q: "I list four flats in Wuse 2. Landech sends me serious renters only, and the dashboard is dead simple.", n: "Hajia Salamatu, Abuja", r: "Landlord" },
            { q: "Closure fees are fair and the verified badge brought me more enquiries in a week than my old listings did in a month.", n: "Emeka, Port Harcourt", r: "Agent" },
          ].map((t) => (
            <div key={t.n} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Quote className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm leading-relaxed text-foreground">{t.q}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For hosts split CTA */}
      <section className="container-page py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <Building2 className="h-3 w-3" /> Landlords
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">List your property in minutes.</h3>
            <p className="mt-2 text-muted-foreground">Direct from landlord listings get a verified badge once your documents are approved. Zero fees, ever.</p>
            <Link to="/for-landlords" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Become a landlord
            </Link>
          </div>
          <div className="rounded-3xl border border-border bg-foreground p-8 text-background md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold text-background">
              <Users className="h-3 w-3" /> Agents
            </div>
            <h3 className="mt-4 font-display text-2xl">Grow with a verified profile.</h3>
            <p className="mt-2 text-background/80">Start on Basic for free. Upgrade to Verified for unlimited listings, priority placement and the trust badge serious renters look for.</p>
            <Link to="/for-agents" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground hover:opacity-95">
              Join as an agent
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-20">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:px-14 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Ready to find a home you can trust?</h2>
              <p className="mt-3 max-w-lg text-primary-foreground/85">
                Tens of thousands of rentals across every Nigerian state. Honest fees, verified hosts, and a real middleman on every deal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/listings" className="rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-95">Browse rentals</Link>
              <Link to="/signup" className="rounded-xl border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">Create an account</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .hero-select {
          width: 100%;
          background: transparent;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-foreground);
          outline: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function HeroField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-muted">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-primary md:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
