import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/listings", label: "Browse rentals", search: undefined },
  { to: "/listings", label: "Shortlets", search: { type: "shortlet" as const } },
  { to: "/services", label: "Home Services" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/for-landlords", label: "For landlords" },
  { to: "/for-agents", label: "For agents" },
  { to: "/dashboard", label: "Dashboards" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <Logo size={36} className="text-primary" />
          <span className="font-display text-[1.4rem] font-extrabold leading-none tracking-tight text-foreground">
            Landech
          </span>
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

          {/* Egg-shaped animated hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-[55%/50%] border border-primary/15 bg-primary-soft text-primary transition-all hover:border-primary/40 hover:bg-primary hover:text-primary-foreground active:scale-95 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 right-0 top-0 h-[2px] rounded-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
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
