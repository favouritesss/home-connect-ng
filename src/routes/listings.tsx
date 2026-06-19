import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import {
  LISTINGS,
  LAGOS_AREAS,
  PROPERTY_TYPES,
  type PropertyType,
  type ListingType,
} from "@/lib/listings";
import { SlidersHorizontal, X } from "lucide-react";

type Search = {
  area?: string;
  propertyType?: PropertyType;
  type?: ListingType;
  bedrooms?: number;
  bathrooms?: number;
  min?: number;
  max?: number;
};

export const Route = createFileRoute("/listings")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    area: typeof s.area === "string" ? s.area : undefined,
    propertyType: typeof s.propertyType === "string" ? (s.propertyType as PropertyType) : undefined,
    type: s.type === "shortlet" || s.type === "long-term" ? s.type : undefined,
    bedrooms: typeof s.bedrooms === "number" ? s.bedrooms : undefined,
    bathrooms: typeof s.bathrooms === "number" ? s.bathrooms : undefined,
    min: typeof s.min === "number" ? s.min : undefined,
    max: typeof s.max === "number" ? s.max : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse rentals in Lagos — Landech" },
      { name: "description", content: "Search verified apartments, self-contained units, and shortlets across Lagos." },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const update = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (search.area && l.area !== search.area) return false;
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
            <h1 className="font-display text-3xl text-foreground md:text-4xl">Rentals in Lagos</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "home" : "homes"} matching your filters
            </p>
          </div>
          {hasFilters && (
            <Link
              to="/listings"
              search={{}}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </Link>
          )}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filter sidebar */}
          <aside className="h-fit rounded-2xl border border-border/70 bg-card p-5 shadow-soft lg:sticky lg:top-20">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
            </div>

            <div className="space-y-5">
              <FilterField label="Rental type">
                <select
                  value={search.type ?? ""}
                  onChange={(e) => update({ type: (e.target.value || undefined) as ListingType | undefined })}
                  className="filter-input"
                >
                  <option value="">All</option>
                  <option value="long-term">Long-term (yearly)</option>
                  <option value="shortlet">Shortlet (per night)</option>
                </select>
              </FilterField>

              <FilterField label="Area">
                <select
                  value={search.area ?? ""}
                  onChange={(e) => update({ area: e.target.value || undefined })}
                  className="filter-input"
                >
                  <option value="">Anywhere</option>
                  {LAGOS_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </FilterField>

              <FilterField label="Property type">
                <select
                  value={search.propertyType ?? ""}
                  onChange={(e) => update({ propertyType: (e.target.value || undefined) as PropertyType | undefined })}
                  className="filter-input"
                >
                  <option value="">Any</option>
                  {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </FilterField>

              <div className="grid grid-cols-2 gap-3">
                <FilterField label="Bedrooms">
                  <select
                    value={search.bedrooms ?? ""}
                    onChange={(e) => update({ bedrooms: e.target.value ? Number(e.target.value) : undefined })}
                    className="filter-input"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </FilterField>
                <FilterField label="Bathrooms">
                  <select
                    value={search.bathrooms ?? ""}
                    onChange={(e) => update({ bathrooms: e.target.value ? Number(e.target.value) : undefined })}
                    className="filter-input"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </FilterField>
              </div>

              <FilterField label="Price (₦)">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={search.min ?? ""}
                    onChange={(e) => update({ min: e.target.value ? Number(e.target.value) : undefined })}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={search.max ?? ""}
                    onChange={(e) => update({ max: e.target.value ? Number(e.target.value) : undefined })}
                    className="filter-input"
                  />
                </div>
              </FilterField>
            </div>
          </aside>

          {/* Results */}
          <section>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <h3 className="font-display text-xl text-foreground">No matches yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try widening your area or removing some filters.
                </p>
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
