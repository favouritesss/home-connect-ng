import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { LocationSearch } from "@/components/site/LocationSearch";
import { LISTINGS, PROPERTY_TYPES, type PropertyType, type ListingType } from "@/lib/listings";
import { STATES } from "@/lib/nigeria";
import { SlidersHorizontal, X } from "lucide-react";

type Search = {
  state?: string;
  area?: string;
  q?: string;
  propertyType?: PropertyType;
  type?: ListingType;
  bedrooms?: number;
  bathrooms?: number;
  min?: number;
  max?: number;
};

export const Route = createFileRoute("/listings")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    state: typeof s.state === "string" ? s.state : undefined,
    area: typeof s.area === "string" ? s.area : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    propertyType: typeof s.propertyType === "string" ? (s.propertyType as PropertyType) : undefined,
    type: s.type === "shortlet" || s.type === "long-term" ? s.type : undefined,
    bedrooms: typeof s.bedrooms === "number" ? s.bedrooms : undefined,
    bathrooms: typeof s.bathrooms === "number" ? s.bathrooms : undefined,
    min: typeof s.min === "number" ? s.min : undefined,
    max: typeof s.max === "number" ? s.max : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse verified rentals across Nigeria, Landech" },
      { name: "description", content: "Search apartments, self-contained, and shortlets across all 36 states + FCT." },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const update = (patch: Partial<Search>) =>
    navigate({ search: (prev: Search) => ({ ...prev, ...patch }) });

  // Real-time live text query (debounced into URL)
  const [liveQuery, setLiveQuery] = useState(search.q ?? (search.area ? `${search.area}, ${search.state ?? ""}` : search.state ?? ""));

  useEffect(() => {
    const t = setTimeout(() => {
      if ((liveQuery || undefined) !== search.q) {
        update({ q: liveQuery || undefined, area: undefined, state: undefined });
      }
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveQuery]);

  const filtered = useMemo(() => {
    const q = (search.q ?? "").trim().toLowerCase();
    return LISTINGS.filter((l) => {
      if (search.state && l.state !== search.state) return false;
      if (search.area && l.area !== search.area) return false;
      if (q) {
        const hay = `${l.title} ${l.area} ${l.state} ${l.address}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (search.propertyType && l.propertyType !== search.propertyType) return false;
      if (search.type && l.type !== search.type) return false;
      if (search.bedrooms && l.bedrooms < search.bedrooms) return false;
      if (search.bathrooms && l.bathrooms < search.bathrooms) return false;
      if (search.min && l.price < search.min) return false;
      if (search.max && l.price > search.max) return false;
      return true;
    });
  }, [search]);

  const hasFilters = Object.values(search).some((v) => v !== undefined && v !== "");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl text-foreground md:text-4xl">
              {search.state ? `Rentals in ${search.state}` : "Rentals across Nigeria"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "home" : "homes"} matching your filters
            </p>
          </div>
          {hasFilters && (
            <Link to="/listings" search={{}} onClick={() => setLiveQuery("")} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" /> Clear filters
            </Link>
          )}
        </div>

        {/* Real-time location search */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-3 shadow-soft">
          <LocationSearch
            value={liveQuery}
            onChange={setLiveQuery}
            onSelect={(loc) => {
              setLiveQuery(loc.label);
              update({ state: loc.state, area: loc.lga, q: undefined });
            }}
            placeholder="Type any town, city, or LGA, results update as you type"
          />
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-border/70 bg-card p-5 shadow-soft lg:sticky lg:top-20">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
            </div>

            <div className="space-y-5">
              <FilterField label="State">
                <select value={search.state ?? ""} onChange={(e) => update({ state: e.target.value || undefined, area: undefined, q: undefined })} className="filter-input">
                  <option value="">All states</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FilterField>

              <FilterField label="Rental type">
                <select value={search.type ?? ""} onChange={(e) => update({ type: (e.target.value || undefined) as ListingType | undefined })} className="filter-input">
                  <option value="">All</option>
                  <option value="long-term">Long-term (yearly)</option>
                  <option value="shortlet">Shortlet (per night)</option>
                </select>
              </FilterField>

              <FilterField label="Property type">
                <select value={search.propertyType ?? ""} onChange={(e) => update({ propertyType: (e.target.value || undefined) as PropertyType | undefined })} className="filter-input">
                  <option value="">Any</option>
                  {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </FilterField>

              <div className="grid grid-cols-2 gap-3">
                <FilterField label="Bedrooms">
                  <select value={search.bedrooms ?? ""} onChange={(e) => update({ bedrooms: e.target.value ? Number(e.target.value) : undefined })} className="filter-input">
                    <option value="">Any</option>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </FilterField>
                <FilterField label="Bathrooms">
                  <select value={search.bathrooms ?? ""} onChange={(e) => update({ bathrooms: e.target.value ? Number(e.target.value) : undefined })} className="filter-input">
                    <option value="">Any</option>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </FilterField>
              </div>

              <FilterField label="Price (₦)">
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Min" value={search.min ?? ""} onChange={(e) => update({ min: e.target.value ? Number(e.target.value) : undefined })} className="filter-input" />
                  <input type="number" placeholder="Max" value={search.max ?? ""} onChange={(e) => update({ max: e.target.value ? Number(e.target.value) : undefined })} className="filter-input" />
                </div>
              </FilterField>
            </div>
          </aside>

          <section>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <h3 className="font-display text-xl text-foreground">No matches yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try widening your area or removing some filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />

      <style>{`
        .filter-input {
          width: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          padding: 0.5rem 0.625rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
        }
        .filter-input:focus { border-color: var(--color-ring); }
      `}</style>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
