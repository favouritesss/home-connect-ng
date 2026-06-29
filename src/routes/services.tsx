import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { STATES, NIGERIA } from "@/lib/nigeria";
import { SERVICE_CATEGORIES, SERVICE_PROVIDERS, type ServiceProvider, type ServiceCategory } from "@/lib/services";
import { Search, MapPin, Star, ShieldCheck, Check, Phone, PlusCircle, Wrench, Sparkles, Paintbrush, Zap, Construction, Hammer, X } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Trusted Home Services & Repairs - Landech" },
      { name: "description", content: "Find verified plumbers, cleaners, electricians, painters, and handymen near you to prepare your home before you move in." },
    ],
  }),
  component: ServicesPage,
});

const ICON_MAP: Record<ServiceCategory, React.ReactNode> = {
  Plumbing: <Wrench className="h-5 w-5" />,
  Cleaning: <Sparkles className="h-5 w-5" />,
  Painting: <Paintbrush className="h-5 w-5" />,
  Electrical: <Zap className="h-5 w-5" />,
  Carpentry: <Hammer className="h-5 w-5" />,
  Maintenance: <Construction className="h-5 w-5" />,
};

function ServicesPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>(SERVICE_PROVIDERS);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "">("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegForm, setShowRegForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  // New Provider Form State
  const [newProvider, setNewProvider] = useState({
    name: "",
    category: "Plumbing" as ServiceCategory,
    priceRange: "₦5,000 - ₦15,000",
    state: "",
    area: "",
    phone: "",
    description: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const stateLgas = useMemo(() => {
    if (!selectedState) return [];
    return NIGERIA.find((s) => s.state === selectedState)?.lgas ?? [];
  }, [selectedState]);

  const formLgas = useMemo(() => {
    if (!newProvider.state) return [];
    return NIGERIA.find((s) => s.state === newProvider.state)?.lgas ?? [];
  }, [newProvider.state]);

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedState && p.state !== selectedState) return false;
      if (selectedLga && p.area !== selectedLga) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [providers, selectedCategory, selectedState, selectedLga, searchQuery]);

  function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newProvider.name || !newProvider.state || !newProvider.area || !newProvider.phone) return;

    const provider: ServiceProvider = {
      id: `sp-new-${Date.now()}`,
      name: newProvider.name,
      category: newProvider.category,
      priceRange: newProvider.priceRange,
      rating: 5.0,
      reviewsCount: 0,
      state: newProvider.state,
      area: newProvider.area,
      phone: newProvider.phone,
      description: newProvider.description || `Professional ${newProvider.category.toLowerCase()} services available in ${newProvider.area}, ${newProvider.state}.`,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&auto=format&fit=crop&q=60",
      verified: false,
      completedJobs: 0,
    };

    setProviders((prev) => [provider, ...prev]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowRegForm(false);
      setNewProvider({
        name: "",
        category: "Plumbing",
        priceRange: "₦5,000 - ₦15,000",
        state: "",
        area: "",
        phone: "",
        description: "",
      });
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-page py-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Checked & Trusted Pros
          </span>
          <h1 className="font-display text-3xl font-extrabold text-foreground md:text-5xl tracking-tight leading-[1.1]">
            Domestic services for your <span className="text-primary">new home</span>.
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Connect with verified local plumbers, cleaners, painters, and handymen. Secure quick gig workers to prepare, repair, or clean your space before or after moving in.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowRegForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs md:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-soft"
            >
              <PlusCircle className="h-4 w-4" /> Offer Your Services
            </button>
            <a
              href="#providers-section"
              className="inline-flex items-center rounded-xl border border-border bg-card px-5 py-3 text-xs md:text-sm font-semibold text-foreground hover:bg-muted transition-all"
            >
              Browse Professionals
            </a>
          </div>
        </section>

        {/* Category quick filters */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">Filter by Specialty</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear specialty
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isActive ? "" : cat)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {ICON_MAP[cat]}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search & Location filter bar */}
        <section id="providers-section" className="mb-8 rounded-2xl border border-border bg-card p-4 md:p-5 shadow-soft">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 bg-background">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search name, bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs md:text-sm outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-center gap-2 border border-border rounded-xl px-2 py-1 bg-background">
              <span className="text-[10px] font-bold text-muted-foreground uppercase px-1">State</span>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedLga("");
                }}
                className="w-full bg-transparent text-xs md:text-sm outline-none text-foreground cursor-pointer"
              >
                <option value="">All states</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 border border-border rounded-xl px-2 py-1 bg-background">
              <span className="text-[10px] font-bold text-muted-foreground uppercase px-1">LGA</span>
              <select
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
                disabled={!selectedState}
                className="w-full bg-transparent text-xs md:text-sm outline-none text-foreground cursor-pointer disabled:opacity-50"
              >
                <option value="">{selectedState ? "All LGAs" : "Pick state first"}</option>
                {stateLgas.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedState("");
                setSelectedLga("");
                setSelectedCategory("");
              }}
              className="rounded-xl border border-primary/20 bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground text-xs md:text-sm font-semibold transition-all py-2.5"
            >
              Reset Filters
            </button>
          </div>
        </section>

        {/* Results grid */}
        <section className="min-h-[400px]">
          {filteredProviders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center max-w-md mx-auto">
              <Wrench className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-display text-lg text-foreground font-semibold">No service providers found</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                We couldn't find any professionals matching your exact criteria. Try resetting your filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((p) => (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-soft hover:border-primary/20"
                >
                  <div>
                    {/* Header profile info */}
                    <div className="flex items-start gap-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-12 w-12 rounded-xl object-cover border border-border"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-display text-sm md:text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                            {p.name}
                          </h3>
                          {p.verified && (
                            <ShieldCheck className="h-4 w-4 text-success shrink-0" title="Verified Professional" />
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground mt-1">
                          {ICON_MAP[p.category]}
                          <span>{p.category}</span>
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-b border-border py-3 text-xs">
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Jobs Done</div>
                        <div className="font-semibold text-foreground mt-0.5">{p.completedJobs > 0 ? `${p.completedJobs} jobs` : "New Pro"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Rates</div>
                        <div className="font-semibold text-foreground mt-0.5">{p.priceRange}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Rating */}
                  <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      <span className="text-xs font-bold text-foreground">{p.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-muted-foreground">({p.reviewsCount})</span>
                    </div>
                    <button
                      onClick={() => setSelectedProvider(p)}
                      className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                    >
                      <Phone className="h-3 w-3" /> Get Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Register Provider Modal */}
      {showRegForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lift animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowRegForm(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-display text-xl font-bold text-foreground">Register as a Service Provider</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              List your domestic service on Landech. Connect with tenants and homeowners who need repairs, painting, cleaning, and more.
            </p>

            {formSubmitted ? (
              <div className="mt-8 py-8 text-center text-success flex flex-col items-center">
                <Check className="h-12 w-12 bg-success/10 rounded-full p-2.5 mb-3" />
                <h3 className="font-bold text-lg">Registration Successful!</h3>
                <p className="text-xs text-muted-foreground mt-1">Your professional profile has been listed on the board.</p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Business / Professional Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                    placeholder="e.g. Kola & Sons Electrical Services"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs md:text-sm outline-none text-foreground focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                      Service Category *
                    </label>
                    <select
                      value={newProvider.category}
                      onChange={(e) =>
                        setNewProvider({ ...newProvider, category: e.target.value as ServiceCategory })
                      }
                      className="w-full rounded-xl border border-border bg-background px-2 py-2.5 text-xs md:text-sm outline-none text-foreground focus:border-primary cursor-pointer"
                    >
                      {SERVICE_CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                      Starting Price Range
                    </label>
                    <input
                      type="text"
                      value={newProvider.priceRange}
                      onChange={(e) => setNewProvider({ ...newProvider, priceRange: e.target.value })}
                      placeholder="e.g. ₦10,000 - ₦30,000"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs md:text-sm outline-none text-foreground focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                      State *
                    </label>
                    <select
                      required
                      value={newProvider.state}
                      onChange={(e) => setNewProvider({ ...newProvider, state: e.target.value, area: "" })}
                      className="w-full rounded-xl border border-border bg-background px-2 py-2.5 text-xs md:text-sm outline-none text-foreground focus:border-primary cursor-pointer"
                    >
                      <option value="">Select state</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                      LGA *
                    </label>
                    <select
                      required
                      value={newProvider.area}
                      onChange={(e) => setNewProvider({ ...newProvider, area: e.target.value })}
                      disabled={!newProvider.state}
                      className="w-full rounded-xl border border-border bg-background px-2 py-2.5 text-xs md:text-sm outline-none text-foreground focus:border-primary cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select LGA</option>
                      {formLgas.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newProvider.phone}
                    onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                    placeholder="e.g. +234 803 000 0000"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs md:text-sm outline-none text-foreground focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Description / Bio (Specialties, experience...)
                  </label>
                  <textarea
                    rows={3}
                    value={newProvider.description}
                    onChange={(e) => setNewProvider({ ...newProvider, description: e.target.value })}
                    placeholder="Describe your services, tools, and work experience..."
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs md:text-sm outline-none text-foreground focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-3 text-xs md:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                  Publish My Profile
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Provider Details / Contact Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lift animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProvider(null)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={selectedProvider.image}
                alt=""
                className="h-14 w-14 rounded-2xl object-cover border border-border"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-display text-lg font-bold text-foreground">{selectedProvider.name}</h3>
                  {selectedProvider.verified && <ShieldCheck className="h-4 w-4 text-success" />}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {selectedProvider.category} · {selectedProvider.area}, {selectedProvider.state}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-foreground/80 leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/50">
              {selectedProvider.description}
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-center text-xs border-b border-border pb-2.5">
                <span className="text-muted-foreground">Price range estimate</span>
                <span className="font-semibold text-foreground">{selectedProvider.priceRange}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-border pb-2.5">
                <span className="text-muted-foreground">Reputation rating</span>
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Star className="h-3 w-3 fill-gold text-gold" /> {selectedProvider.rating.toFixed(1)} (
                  {selectedProvider.reviewsCount} reviews)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Verification status</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  {selectedProvider.verified ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> ID Checked
                    </>
                  ) : (
                    <span className="text-muted-foreground">Pending Review</span>
                  )}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`tel:${selectedProvider.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs md:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Phone className="h-4 w-4" /> Call {selectedProvider.phone}
              </a>
              <a
                href={`https://wa.me/${selectedProvider.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-success/30 bg-success/5 hover:bg-success/15 py-3 text-xs md:text-sm font-semibold text-success transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
