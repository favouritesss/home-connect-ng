import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShieldCheck, MessageSquare, ArrowRight, BadgeCheck, Wallet, Users, Building2, Quote, Star, ChevronRight, Heart, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { LISTINGS, PROPERTY_TYPES, formatNaira } from "@/lib/listings";
import { NIGERIA, STATES } from "@/lib/nigeria";
import heroHouse from "@/assets/hero-house.jpg";

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
      { title: "Landech — rent a home you can actually trust" },
      { name: "description", content: "Verified landlords. Honest fees shown up front. Every enquiry handled by a real human so nobody ghosts you mid-search." },
      { property: "og:title", content: "Landech — rent a home you can actually trust" },
      { property: "og:description", content: "Verified hosts, capped fees, and a middleman on every deal. Rentals across every state in Nigeria." },
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

      {/* Hero — Editorial Luxe Canvas with faded house backdrop */}
      <section className="relative overflow-hidden bg-background">
        {/* Backdrop house illustration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 bg-center bg-no-repeat opacity-[0.07] [background-size:90%_auto] md:opacity-[0.09] md:[background-size:70%_auto]"
          style={{ backgroundImage: `url(${heroHouse})` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-b from-transparent to-background"
        />

        <div className="container-page relative pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-primary md:text-7xl lg:text-[5.5rem]">
              Find home.
              <br />
              <span className="text-gold">Without the run-around.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base font-medium text-primary/70 md:text-lg">
              Rentals from verified hosts, with prices, fees and floor plans laid bare before you ever pick up the phone.
            </p>
          </div>

          {/* Search card — three section bar matching chosen layout */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 flex max-w-3xl items-stretch gap-1 rounded-2xl border border-primary/5 bg-card p-2 shadow-[0_32px_64px_-16px_rgb(0_48_135_/_0.15)]"
          >
            <div className="flex flex-1 min-w-0 items-center gap-2 px-3">
              <Search className="h-4 w-4 shrink-0 text-primary/40" />
              <select
                value={state}
                onChange={(e) => { setState(e.target.value); setLga(""); }}
                className="hero-select flex-1 min-w-0"
                aria-label="State"
              >
                <option value="">Any state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="hidden h-6 w-px bg-primary/10 sm:block" />
              <select
                value={lga}
                onChange={(e) => setLga(e.target.value)}
                disabled={!state}
                className="hero-select hidden flex-1 min-w-0 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
                aria-label="LGA"
              >
                <option value="">{state ? "Any LGA" : "Pick state"}</option>
                {lgaOptions.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="hidden items-center gap-2 border-l border-primary/10 px-4 md:flex">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary/40">Type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "long-term" | "shortlet" | "")}
                className="hero-select font-semibold text-primary"
                aria-label="Rental type"
              >
                <option value="">For Rent</option>
                <option value="long-term">Long-term</option>
                <option value="shortlet">Shortlet</option>
              </select>
            </div>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95 sm:px-8">
              <Search className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Popular pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="mr-1 text-xs font-bold uppercase tracking-widest text-primary/40">Popular</span>
            {[
              { state: "Lagos", area: "Eti Osa", label: "Lekki" },
              { state: "FCT - Abuja", area: "Municipal Area Council", label: "Wuse" },
              { state: "Rivers", area: "Port Harcourt", label: "Port Harcourt" },
              { state: "Oyo", area: "Ibadan North", label: "Ibadan" },
              { state: "Enugu", area: "Enugu North", label: "Enugu" },
            ].map((s) => (
              <Link
                key={s.label}
                to="/listings"
                search={{ state: s.state, area: s.area }}
                className="rounded-full border border-gold/60 px-5 py-2 text-xs font-bold text-primary transition-all hover:bg-gold hover:text-gold-foreground"
              >{s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-page pt-4 pb-12">
        <div className="grid gap-8 md:grid-cols-3">
          <TrustItem icon={<ShieldCheck className="h-5 w-5" />} title="Every host, ID-checked" body="Landlords and agents clear identity and document checks before a single photo goes live." />
          <TrustItem icon={<MessageSquare className="h-5 w-5" />} title="A human in the middle" body="Your first message comes to us. We hand it to the host and bring the reply back, on the record." />
          <TrustItem icon={<Wallet className="h-5 w-5" />} title="No surprise fees" body="Rent, caution, agency and legal — every number is on the listing before you tap enquire." />
        </div>
      </section>

      {/* New to Market — editorial cards */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4 border-b-2 border-primary/5 pb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Fresh off the market</h2>
            <p className="mt-2 text-base font-medium text-primary/60">Homes listed this week — checked, photographed and ready to tour.</p>
          </div>
          <Link to="/listings" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            See all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {featured.slice(0, 3).map((l) => <EditorialCard key={l.id} listing={l} />)}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(3, 6).map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* Market presence — navy stats panel */}
      <section className="container-page py-12">
        <div className="flex flex-col items-center justify-between gap-12 rounded-[2rem] bg-primary p-10 text-primary-foreground md:flex-row md:p-16">
          <div className="max-w-md text-center md:text-left">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              A neighbour, <span className="text-gold">in every city.</span>
            </h2>
            <p className="mt-4 text-base font-medium text-primary-foreground/70">
              Real people on the ground in the places that move fastest — so you hear back the same day, not next week.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:gap-x-16">
            <StatLuxe value={`${totalListings}+`} label="Active rentals" />
            <StatLuxe value={`${totalStates}`} label="States covered" />
            <StatLuxe value={`${totalLgas}`} label="LGAs searchable" />
            <StatLuxe value="₦0" label="Cost to list" />
          </div>
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
            <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">Four steps. No back-and-forth.</h2>
            <p className="mt-4 text-muted-foreground">
              You search, we relay, the host replies, you move in. Every message and naira is on the record, end to end.
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

function HeroField({ label, children, divider }: { label: string; children: React.ReactNode; divider?: boolean }) {
  return (
    <label className={`flex flex-col justify-center gap-0.5 px-5 py-3 ${divider ? "md:border-l md:border-primary/10" : ""}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">{label}</span>
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

function StatLuxe({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl font-extrabold text-primary-foreground md:text-5xl">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-gold">{label}</p>
    </div>
  );
}

function EditorialCard({ listing }: { listing: import("@/lib/listings").Listing }) {
  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group block cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-card/95 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-soft backdrop-blur">
            {listing.type === "shortlet" ? "Shortlet" : "New listing"}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/80">
            {listing.area}, {listing.state}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-primary-foreground">
            {formatNaira(listing.price)}
            <span className="ml-1 text-sm font-medium text-primary-foreground/70">
              {listing.type === "shortlet" ? "/ night" : "/ year"}
            </span>
          </h3>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="min-w-0 space-y-1">
          <p className="truncate font-bold text-primary">{listing.title}</p>
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-tight text-primary/40">
            <span>{listing.bedrooms} Bed</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>{listing.bathrooms} Bath</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>{listing.propertyType}</span>
          </div>
        </div>
        <button
          type="button"
          aria-label="Save"
          onClick={(e) => { e.preventDefault(); }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
    </Link>
  );
}

