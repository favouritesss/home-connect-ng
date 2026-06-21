import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  Info,
  MapPin,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { formatNaira, getListingById } from "@/lib/listings";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }) => {
    const listing = getListingById(params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.listing.title}, Landech` },
          { name: "description", content: loaderData.listing.description.slice(0, 155) },
          { property: "og:title", content: loaderData.listing.title },
          { property: "og:description", content: loaderData.listing.description.slice(0, 155) },
          { property: "og:image", content: loaderData.listing.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <h1 className="font-display text-3xl">Listing not found</h1>
        <Link to="/listings" className="mt-4 inline-block text-primary hover:underline">
          Back to all listings
        </Link>
      </div>
    </div>
  ),
  component: ListingDetail,
});

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [active, setActive] = useState(0);

  const badgeLabel = listing.listedBy === "landlord"
    ? (listing.verified ? "Verified Landlord" : "Direct from Landlord")
    : (listing.verified ? "Verified Agent" : "Agent");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container-page py-8">
        <Link to="/listings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to rentals
        </Link>

        {/* Gallery */}
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_320px]">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <img
              src={listing.gallery[active]}
              alt={listing.title}
              className="h-full w-full object-cover"
              width={1600}
              height={1000}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {listing.gallery.map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${
                  active === i ? "border-primary" : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <article>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" /> {badgeLabel}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {listing.propertyType}
              </span>
              <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-semibold text-gold-foreground">
                {listing.type === "shortlet" ? "Shortlet" : "Long-term"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl text-foreground md:text-4xl">{listing.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {listing.address}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-border py-4 text-sm">
              <Stat icon={<BedDouble className="h-4 w-4" />} label="Bedrooms" value={String(listing.bedrooms)} />
              <Stat icon={<Bath className="h-4 w-4" />} label="Bathrooms" value={String(listing.bathrooms)} />
              <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Status" value={listing.status} />
            </div>

            <section className="mt-8">
              <h2 className="font-display text-xl text-foreground">About this place</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{listing.description}</p>
            </section>

            <section className="mt-8 rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-xl text-foreground">Fees, fully disclosed</h2>
              <p className="mt-1 text-sm text-muted-foreground">No surprises. Everything you'd pay is listed below.</p>
              <dl className="mt-4 divide-y divide-border text-sm">
                <FeeRow
                  label={listing.type === "shortlet" ? "Per night" : "Yearly rent"}
                  value={formatNaira(listing.price)}
                  emphasis
                />
                {listing.agencyFee !== undefined && (
                  <FeeRow label="Agency fee (one-off)" value={formatNaira(listing.agencyFee)} />
                )}
                {listing.cautionFee !== undefined && (
                  <FeeRow label="Caution / refundable deposit" value={formatNaira(listing.cautionFee)} />
                )}
              </dl>
            </section>
          </article>

          {/* Sticky enquire card */}
          <aside className="h-fit lg:sticky lg:top-20">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl text-foreground">{formatNaira(listing.price)}</span>
                <span className="text-sm text-muted-foreground">
                  {listing.type === "shortlet" ? "/ night" : "/ year"}
                </span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Listed by <span className="font-semibold text-foreground">{listing.hostName}</span>
              </p>

              <button
                onClick={() => setEnquireOpen(true)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
              >
                <MessageSquare className="h-4 w-4" /> Enquire through Landech
              </button>

              <div className="mt-4 flex gap-2 rounded-xl bg-primary-soft p-3 text-xs text-primary">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Your enquiry goes to Landech first. We pass it to the {listing.listedBy} and
                  bring their reply back to you, all inside the platform.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {enquireOpen && <EnquireDialog listingTitle={listing.title} onClose={() => setEnquireOpen(false)} />}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function FeeRow({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={emphasis ? "font-display text-lg text-foreground" : "font-semibold text-foreground"}>
        {value}
      </dd>
    </div>
  );
}

function EnquireDialog({ listingTitle, onClose }: { listingTitle: string; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-lift"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl text-foreground">
              {sent ? "Enquiry sent" : "Enquire about this home"}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{listingTitle}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="rounded-xl bg-primary-soft p-4 text-sm text-primary">
            Thanks, Landech has received your enquiry and will pass it to the host.
            You'll get a reply in your inbox once they respond.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-3"
          >
            <Field label="Your name"><input required className="dialog-input" placeholder="Chinonso A." /></Field>
            <Field label="Email or phone"><input required className="dialog-input" placeholder="you@example.com" /></Field>
            <Field label="Message">
              <textarea required rows={4} className="dialog-input" placeholder="Hi, I'd like to know if this is still available and when I can inspect." />
            </Field>
            <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Send to Landech
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              No direct contact details are shared. All replies stay inside Landech.
            </p>
          </form>
        )}
        <style>{`
          .dialog-input {
            width: 100%;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 0.625rem;
            padding: 0.625rem 0.75rem;
            font-size: 0.875rem;
            color: var(--color-foreground);
            outline: none;
          }
          .dialog-input:focus { border-color: var(--color-ring); }
        `}</style>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}
