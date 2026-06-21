import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell, DashCard, SectionTitle } from "@/components/dashboard/DashboardShell";
import { LISTINGS, formatNaira, type Status } from "@/lib/listings";
import { CheckCircle2, Clock, Edit3, Wallet, Crown, ArrowUpCircle, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/dashboard/agent")({
  head: () => ({ meta: [{ title: "Agent dashboard, Landech" }] }),
  component: AgentDashboard,
});

interface AgentListing { id: string; title: string; price: number; state: string; area: string; status: Status; image: string; closed: boolean; }

function AgentDashboard() {
  const [plan, setPlan] = useState<"basic" | "verified">("basic");
  const [listings, setListings] = useState<AgentListing[]>(
    LISTINGS.slice(2, 6).map((l) => ({ id: l.id, title: l.title, price: l.price, state: l.state, area: l.area, status: l.status, image: l.image, closed: false }))
  );
  const [invoices, setInvoices] = useState<{ id: string; listing: string; amount: number; status: "paid" | "unpaid"; date: string }[]>([
    { id: "INV-2026-014", listing: "3 Bedroom Flat, Ikeja GRA", amount: 10000, status: "paid", date: "12 Mar 2026" },
    { id: "INV-2026-022", listing: "2 Bedroom Apartment, Lekki", amount: 10000, status: "unpaid", date: "18 Mar 2026" },
  ]);

  const limit = plan === "basic" ? 3 : Infinity;
  const closedCount = listings.filter((l) => l.closed).length;
  const unpaid = invoices.filter((i) => i.status === "unpaid").reduce((s, i) => s + i.amount, 0);

  function closeDeal(id: string) {
    setListings((ls) => ls.map((l) => l.id === id ? { ...l, closed: true, status: "Rented" } : l));
    const target = listings.find((l) => l.id === id)!;
    setInvoices((iv) => [{ id: `INV-${Date.now()}`, listing: target.title, amount: 10000, status: "unpaid", date: new Date().toLocaleDateString("en-NG") }, ...iv]);
  }
  function payInvoice(id: string) {
    setInvoices((iv) => iv.map((x) => x.id === id ? { ...x, status: "paid" } : x));
  }

  return (
    <DashboardShell role="agent" userName="Emeka O." badge={plan === "verified" ? "Verified Agent" : "Basic plan"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground">Agent dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">List up to {plan === "basic" ? "3 properties on Basic" : "unlimited properties on Verified"}. All fees go through Landech.</p>
        </div>
        {plan === "basic" && (
          <button onClick={() => setPlan("verified")} className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-95">
            <ArrowUpCircle className="h-4 w-4" /> Upgrade to Verified, ₦5,000 / month
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashCard title="Active listings" value={`${listings.filter((l) => !l.closed).length}`} hint={plan === "basic" ? `Limit ${limit}` : "Unlimited"} />
        <DashCard title="Deals closed" value={`${closedCount}`} hint="Year to date" />
        <DashCard title="Closure fees owed" value={formatNaira(unpaid)} hint="Pay to keep account active" accent={unpaid > 0} />
        <DashCard title="Plan" value={plan === "verified" ? "Verified" : "Basic"} hint={plan === "verified" ? "₦5,000 / month" : "Free, 3 listings"} />
      </div>

      <section className="mt-10">
        <SectionTitle title="My listings" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-4 py-3">Property</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={l.image} alt="" className="h-10 w-14 rounded object-cover" />
                      <div>
                        <div className="font-medium text-foreground">{l.title}</div>
                        <div className="text-xs text-muted-foreground">{l.area}, {l.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">{formatNaira(l.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${l.closed ? "bg-success/15 text-success" : "bg-primary-soft text-primary"}`}>
                      {l.closed ? <><CheckCircle2 className="h-3 w-3" /> Closed</> : <><Clock className="h-3 w-3" /> {l.status}</>}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!l.closed ? (
                      <button onClick={() => closeDeal(l.id)} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Mark as closed</button>
                    ) : (
                      <button className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:bg-muted"><Edit3 className="h-3 w-3" /> Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Marking a yearly deal as closed automatically triggers a ₦10,000 Landech closure fee invoice.</p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionTitle title="Closure invoices" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-4 py-3">Invoice</th><th className="px-4 py-3">Listing</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right"></th></tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                    <td className="px-4 py-3">{i.listing}</td>
                    <td className="px-4 py-3 font-semibold">{formatNaira(i.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${i.status === "paid" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>{i.status === "paid" ? "Paid" : "Unpaid"}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {i.status === "unpaid" && <button onClick={() => payInvoice(i.id)} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"><Wallet className="h-3 w-3" /> Pay via Paystack</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <SectionTitle title="Plan details" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Crown className={`h-5 w-5 ${plan === "verified" ? "text-gold" : "text-muted-foreground"}`} />
              <h3 className="font-display text-xl text-foreground">{plan === "verified" ? "Verified plan" : "Basic plan"}</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {plan === "verified" ? (
                <>
                  <PlanItem text="Unlimited listings" on />
                  <PlanItem text="Verified Agent badge" on />
                  <PlanItem text="Priority placement in search" on />
                  <PlanItem text="Faster enquiry routing" on />
                </>
              ) : (
                <>
                  <PlanItem text="Up to 3 active listings" on />
                  <PlanItem text="Standard search visibility" on />
                  <PlanItem text="Verified Agent badge" off />
                  <PlanItem text="Priority enquiry routing" off />
                </>
              )}
            </ul>
            {plan === "basic" ? (
              <button onClick={() => setPlan("verified")} className="mt-5 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Upgrade to Verified</button>
            ) : (
              <button onClick={() => setPlan("basic")} className="mt-5 w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">Switch back to Basic</button>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><MessageSquare className="h-4 w-4 text-primary" /> Open enquiries</div>
            <div className="mt-1 font-display text-3xl text-foreground">7</div>
            <div className="text-xs text-muted-foreground">Awaiting your reply via the in-app inbox.</div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}

function PlanItem({ text, on, off }: { text: string; on?: boolean; off?: boolean }) {
  return (
    <li className={`flex items-center gap-2 ${off ? "text-muted-foreground line-through" : "text-foreground"}`}>
      <CheckCircle2 className={`h-4 w-4 ${on ? "text-success" : "text-muted-foreground"}`} /> {text}
    </li>
  );
}
