import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo size={36} className="text-primary" />
            <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-foreground">Landech</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A rental platform that puts the paperwork, the price and the person on the same page, before you ever pick up the keys.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Serving all 36 states + FCT</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> hello@landech.ng</li>
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> +234 800 LANDECH</li>
          </ul>
        </div>

        <FooterCol title="Explore" links={[
          { to: "/listings", label: "All rentals" },
          { to: "/listings", label: "Long-term rent", search: { type: "long-term" as const } },
          { to: "/listings", label: "Shortlets", search: { type: "shortlet" as const } },
          { to: "/pricing", label: "Fees & pricing" },
        ]} />

        <FooterCol title="Company" links={[
          { to: "/about", label: "About Landech" },
          { to: "/how-it-works", label: "How it works" },
          { to: "/for-landlords", label: "For landlords" },
          { to: "/for-agents", label: "For agents" },
          { to: "/contact", label: "Contact us" },
        ]} />

        <FooterCol title="Support" links={[
          { to: "/faq", label: "FAQ" },
          { to: "/safety", label: "Safety & trust" },
          { to: "/terms", label: "Terms of use" },
          { to: "/privacy", label: "Privacy policy" },
        ]} />
      </div>

      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Landech. Built for Nigeria.</span>
          <span>Made with care in Lagos · Live across all 36 states + FCT</span>
        </div>
      </div>
    </footer>
  );
}

interface FooterLink { to: string; label: string; search?: Record<string, unknown>; }

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} search={l.search as never} className="hover:text-foreground">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
