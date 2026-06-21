import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell, DashCard, SectionTitle } from "@/components/dashboard/DashboardShell";
import { LISTINGS, formatNaira } from "@/lib/listings";
import { CheckCircle2, XCircle, ShieldAlert, Trash2, Eye, Ban } from "lucide-react";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin panel, Landech" }] }),
  component: AdminDashboard,
});

interface Verification { id: string; user: string; role: "Landlord" | "Agent"; submitted: string; status: "pending" | "approved" | "rejected"; }
interface UserRow { id: string; name: string; role: "Tenant" | "Landlord" | "Agent"; state: string; status: "active" | "blacklisted"; nin: string; joined: string; }

function AdminDashboard() {
  const [verifications, setVerifications] = useState<Verification[]>([
    { id: "v1", user: "Hajia Salamatu I.", role: "Landlord", submitted: "2 hours ago", status: "pending" },
    { id: "v2", user: "Skylink Properties", role: "Agent", submitted: "4 hours ago", status: "pending" },
    { id: "v3", user: "Mr. Tunde O.", role: "Landlord", submitted: "Yesterday", status: "pending" },
    { id: "v4", user: "Capital Homes", role: "Agent", submitted: "Today", status: "approved" },
  ]);
  const [users, setUsers] = useState<UserRow[]>([
    { id: "u1", name: "Chinedu A.", role: "Tenant", state: "Lagos", status: "active", nin: "1234, 567, 890", joined: "Jan 2026" },
    { id: "u2", name: "Hajia Salamatu I.", role: "Landlord", state: "FCT - Abuja", status: "active", nin: "9876, 543, 210", joined: "Feb 2026" },
    { id: "u3", name: "Emeka O.", role: "Agent", state: "Rivers", status: "active", nin: "5544, 332, 211", joined: "Feb 2026" },
    { id: "u4", name: "Ibrahim B.", role: "Agent", state: "Kano", status: "blacklisted", nin: "1122, 334, 455", joined: "Dec 2025" },
  ]);

  function approve(id: string) { setVerifications((v) => v.map((x) => x.id === id ? { ...x, status: "approved" } : x)); }
  function reject(id: string) { setVerifications((v) => v.map((x) => x.id === id ? { ...x, status: "rejected" } : x)); }
  function toggleBlacklist(id: string) { setUsers((u) => u.map((x) => x.id === id ? { ...x, status: x.status === "blacklisted" ? "active" : "blacklisted" } : x)); }

  const pending = verifications.filter((v) => v.status === "pending").length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const blacklisted = users.filter((u) => u.status === "blacklisted").length;

  return (
    <DashboardShell role="admin" userName="Admin (Landech HQ)" badge="Super admin">
      <h1 className="font-display text-3xl text-foreground">Admin overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Approve hosts, monitor listings, manage users and oversee fee collection.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashCard title="Pending verifications" value={`${pending}`} hint="Review needed" accent={pending > 0} />
        <DashCard title="Active users" value={`${activeUsers}`} hint={`${blacklisted} blacklisted NINs`} />
        <DashCard title="Live listings" value={`${LISTINGS.length}`} hint="Across all states" />
        <DashCard title="Revenue this month" value="₦485,000" hint="Closure fees + shortlets" />
      </div>

      <section className="mt-10">
        <SectionTitle title="Verification queue" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-4 py-3">User</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Decision</th></tr>
            </thead>
            <tbody>
              {verifications.map((v) => (
                <tr key={v.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{v.user}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.submitted}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      v.status === "approved" ? "bg-success/15 text-success" :
                      v.status === "rejected" ? "bg-destructive/15 text-destructive" :
                      "bg-gold/20 text-gold-foreground"
                    }`}>{v.status[0].toUpperCase() + v.status.slice(1)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {v.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => approve(v.id)} className="inline-flex items-center gap-1 rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground hover:opacity-90"><CheckCircle2 className="h-3 w-3" /> Approve</button>
                        <button onClick={() => reject(v.id)} className="inline-flex items-center gap-1 rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"><XCircle className="h-3 w-3" /> Reject</button>
                      </div>
                    )}
                    {v.status !== "pending" && <button className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:bg-muted"><Eye className="h-3 w-3" /> View docs</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle title="Users" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">State</th><th className="px-4 py-3">NIN</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.state}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.nin}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${u.status === "active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                      {u.status === "active" ? "Active" : "Blacklisted"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toggleBlacklist(u.id)} className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:bg-muted">
                      {u.status === "active" ? <><Ban className="h-3 w-3" /> Blacklist NIN</> : <><CheckCircle2 className="h-3 w-3" /> Reinstate</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle title="Recent listings" />
          <div className="space-y-3">
            {LISTINGS.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <img src={l.image} alt="" className="h-12 w-16 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{l.title}</div>
                  <div className="text-xs text-muted-foreground">{l.area}, {l.state}, {formatNaira(l.price)}</div>
                </div>
                <button className="inline-flex items-center gap-1 rounded-lg border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /> Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle title="Recent payments" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-3 py-2">Ref</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Amount</th><th className="px-3 py-2">Status</th></tr>
              </thead>
              <tbody>
                {[
                  { r: "PS-44213", t: "Closure fee", a: 10000, s: "paid" },
                  { r: "PS-44210", t: "Shortlet booking", a: 65000, s: "paid" },
                  { r: "PS-44199", t: "Closure fee", a: 10000, s: "pending" },
                  { r: "PS-44182", t: "Verified plan", a: 5000, s: "paid" },
                ].map((p) => (
                  <tr key={p.r} className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">{p.r}</td>
                    <td className="px-3 py-2 text-muted-foreground">{p.t}</td>
                    <td className="px-3 py-2 font-semibold">{formatNaira(p.a)}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.s === "paid" ? "bg-success/15 text-success" : "bg-gold/20 text-gold-foreground"}`}>{p.s}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-gold" />
          <div>
            <h3 className="font-display text-lg text-foreground">NIN enforcement reminder</h3>
            <p className="mt-1 text-sm text-muted-foreground">One NIN equals one account, forever. Any agent who refuses to pay a closure fee gets their NIN automatically added to the blacklist, blocking future signups under the same identity.</p>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
