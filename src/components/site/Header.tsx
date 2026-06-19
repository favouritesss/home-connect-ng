import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="font-display text-2xl leading-none text-foreground">
            Landech
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/listings" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Browse rentals
          </Link>
          <Link to="/listings" search={{ type: "shortlet" }} className="transition-colors hover:text-foreground">
            Shortlets
          </Link>
          <Link to="/how-it-works" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            How it works
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
          >
            List a property
          </Link>
        </div>
      </div>
    </header>
  );
}
