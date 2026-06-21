import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  LayoutDashboard, Home, MessageSquare, Heart, Gift, Building2,
  PlusCircle, Wallet, Users, ShieldCheck, FileCheck, BarChart3, Settings, LogOut,
} from "lucide-react";

type Role = "tenant" | "landlord" | "agent" | "admin";

const NAV: Record<Role, { to: string; label: string; icon: ReactNode }[]> = {
  tenant: [
    { to: "/dashboard/tenant", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/dashboard/tenant", label: "Saved homes", icon: <Heart className="h-4 w-4" /> },
    { to: "/dashboard/tenant", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
    { to: "/dashboard/tenant", label: "Referrals", icon: <Gift className="h-4 w-4" /> },
  ],
  landlord: [
    { to: "/dashboard/landlord", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/dashboard/landlord", label: "My listings", icon: <Building2 className="h-4 w-4" /> },
    { to: "/dashboard/landlord", label: "Add listing", icon: <PlusCircle className="h-4 w-4" /> },
    { to: "/dashboard/landlord", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
    { to: "/dashboard/landlord", label: "Verification", icon: <ShieldCheck className="h-4 w-4" /> },
  ],
  agent: [
    { to: "/dashboard/agent", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/dashboard/agent", label: "Listings", icon: <Building2 className="h-4 w-4" /> },
    { to: "/dashboard/agent", label: "Enquiries", icon: <MessageSquare className="h-4 w-4" /> },
    { to: "/dashboard/agent", label: "Closures & invoices", icon: <Wallet className="h-4 w-4" /> },
    { to: "/dashboard/agent", label: "Plan", icon: <BarChart3 className="h-4 w-4" /> },
  ],
  admin: [
    { to: "/dashboard/admin", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/dashboard/admin", label: "Verifications", icon: <FileCheck className="h-4 w-4" /> },
    { to: "/dashboard/admin", label: "Users", icon: <Users className="h-4 w-4" /> },
    { to: "/dashboard/admin", label: "Listings", icon: <Building2 className="h-4 w-4" /> },
    { to: "/dashboard/admin", label: "Payments", icon: <Wallet className="h-4 w-4" /> },
  ],
};

const ROLE_NAMES: Record<Role, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  agent: "Agent",
  admin: "Admin",
};

export function DashboardShell({
  role,
  userName,
  badge,
  children,
}: {
  role: Role;
  userName: string;
  badge?: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-surface">
      {/* Demo banner */}
      <div className="bg-foreground text-background">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
          <span>Demo mode, exploring the {ROLE_NAMES[role]} dashboard. Auth is stubbed for Phase 1 preview.</span>
          <div className="flex items-center gap-3">
            <span className="opacity-70">Switch role:</span>
            {(Object.keys(ROLE_NAMES) as Role[]).map((r) => (
              <Link
                key={r}
                to={`/dashboard/${r}`}
                className={`rounded-full px-2.5 py-0.5 font-medium ${
                  r === role ? "bg-background text-foreground" : "bg-background/10 text-background hover:bg-background/20"
                }`}
              >
                {ROLE_NAMES[r]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-border bg-background lg:flex lg:flex-col">
          <Link to="/" className="flex items-center gap-2 border-b border-border px-6 py-5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Home className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <span className="font-display text-2xl leading-none text-foreground">Landech</span>
          </Link>

          <div className="px-4 py-4">
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{ROLE_NAMES[role]}</div>
              <div className="mt-0.5 truncate font-display text-base text-foreground">{userName}</div>
              {badge && <div className="mt-1 inline-flex rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">{badge}</div>}
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 pb-6">
            {NAV[role].map((n, i) => (
              <Link
                key={n.label + i}
                to={n.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === n.to && i === 0
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {n.icon} {n.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
              <Settings className="h-4 w-4" /> Settings
            </Link>
            <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
              <LogOut className="h-4 w-4" /> Exit demo
            </Link>
          </div>
        </aside>

        <main className="min-w-0">
          {/* Mobile header */}
          <div className="border-b border-border bg-background px-5 py-4 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Home className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-xl leading-none text-foreground">Landech</span>
            </Link>
          </div>

          <div className="container-page py-8 lg:px-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function DashCard({ title, value, hint, accent }: { title: string; value: string; hint?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
      <div className={`text-xs font-semibold uppercase tracking-wide ${accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{title}</div>
      <div className="mt-1 font-display text-3xl">{value}</div>
      {hint && <div className={`mt-1 text-xs ${accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{hint}</div>}
    </div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      {action}
    </div>
  );
}
