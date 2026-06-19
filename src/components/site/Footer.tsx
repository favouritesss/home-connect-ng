import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-foreground">Landech</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Renting in Nigeria, made simple and transparent. Verified listings,
            no hidden fees, and a trusted middleman on every deal.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/listings" className="hover:text-foreground">All rentals</Link></li>
            <li><Link to="/listings" search={{ type: "long-term" }} className="hover:text-foreground">Long-term rent</Link></li>
            <li><Link to="/listings" search={{ type: "shortlet" }} className="hover:text-foreground">Shortlets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground">How it works</Link></li>
            <li><Link to="/signup" className="hover:text-foreground">List a property</Link></li>
            <li><Link to="/login" className="hover:text-foreground">Sign in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Landech. Built for Nigeria, starting in Lagos.</span>
          <span>Phase 1 — Lagos</span>
        </div>
      </div>
    </footer>
  );
}
