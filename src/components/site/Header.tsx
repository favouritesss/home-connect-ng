import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Menu, X } from "lucide-react";

const NAV = [
  { to: "/listings", label: "Browse rentals", search: undefined },
  { to: "/listings", label: "Shortlets", search: { type: "shortlet" as const } },
  { to: "/how-it-works", label: "How it works" },
  { to: "/for-landlords", label: "For landlords" },
  { to: "/for-agents", label: "For agents" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <span className="font-display text-2xl leading-none text-foreground">Landech</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={item.search as never}
              activeProps={{ className: "text-foreground" }}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted sm:inline-flex">
            Sign in
          </Link>
          <Link to="/signup" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90">
            List a property
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md text-foreground hover:bg-muted lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search as never}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted sm:hidden">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
