import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, MapPin, ShieldCheck } from "lucide-react";
import { formatNaira, type Listing } from "@/lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  const badgeLabel = listing.listedBy === "landlord"
    ? (listing.verified ? "Verified Landlord" : "Direct from Landlord")
    : (listing.verified ? "Verified Agent" : "Agent");

  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      className="group block overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft">
            <ShieldCheck className="h-3 w-3 text-primary" />
            {badgeLabel}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
            {listing.type === "shortlet" ? "Shortlet" : "Yearly"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-lg font-semibold text-foreground">
            {formatNaira(listing.price)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              {listing.type === "shortlet" ? "/ night" : "/ year"}
            </span>
          </p>
        </div>
        <h3 className="mt-1 line-clamp-1 font-display text-lg leading-snug text-foreground">
          {listing.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {listing.area}
        </p>

        <div className="mt-3 flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" /> {listing.bedrooms} bed
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {listing.bathrooms} bath
          </span>
          <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
            {listing.propertyType}
          </span>
        </div>
      </div>
    </Link>
  );
}
