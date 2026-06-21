import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, User, Building2, Briefcase, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboards, Landech" }] }),
  component: DashboardPicker,
});

function DashboardPicker() {
  const roles = [
    { to: "/dashboard/tenant", icon: <User className="h-5 w-5" />, name: "Tenant", desc: "Browse, save and message landlords. Track your referrals and earnings." },
    { to: "/dashboard/landlord", icon: <Building2 className="h-5 w-5" />, name: "Landlord", desc: "Post your properties for free. Manage listings, enquiries and verification." },
    { to: "/dashboard/agent", icon: <Briefcase className="h-5 w-5" />, name: "Agent", desc: "List and manage properties, close deals, pay your ₦10,000 closure fee in-app." },
    { to: "/dashboard/admin", icon: <ShieldCheck className="h-5 w-5" />, name: "Admin", desc: "Approve verifications, monitor listings, manage users and fee collection." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-page py-16">
        <h1 className="font-display text-4xl text-foreground">Pick a dashboard to preview</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Auth is not wired in Phase 1 preview. Use these demo dashboards to explore exactly what each user type will see once accounts go live.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roles.map((r) => (
            <Link
              key={r.name}
              to={r.to}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">{r.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-foreground group-hover:text-primary">{r.name}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
