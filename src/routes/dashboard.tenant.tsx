import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell, DashCard, SectionTitle } from "@/components/dashboard/DashboardShell";
import { LISTINGS, formatNaira } from "@/lib/listings";
import { Heart, MapPin, Send, Gift, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/tenant")({
  head: () => ({ meta: [{ title: "Tenant dashboard, Landech" }] }),
  component: TenantDashboard,
});

function TenantDashboard() {
  const [saved, setSaved] = useState<string[]>(LISTINGS.slice(0, 4).map((l) => l.id));
  const [messages, setMessages] = useState([
    { id: "m1", from: "Ada Realty", listing: "Modern 2 Bedroom Apartment, Lekki", text: "Hello, the apartment is still available. When would you like to inspect?", time: "2h ago", unread: true },
    { id: "m2", from: "Mr. Tunde O.", listing: "Neat Self-Contained Studio, Yaba", text: "Sure, viewing on Saturday at 10am works.", time: "Yesterday", unread: false },
    { id: "m3", from: "StayLagos", listing: "Luxury Shortlet, VI", text: "Your booking has been confirmed for 12 to 15 March.", time: "3 days ago", unread: false },
  ]);
  const [reply, setReply] = useState("");
  const [activeMsg, setActiveMsg] = useState("m1");
  const [copied, setCopied] = useState(false);

  const referralLink = "https://landech.ng/r/chinedu-2026";
  const savedListings = LISTINGS.filter((l) => saved.includes(l.id));
  const conv = messages.find((m) => m.id === activeMsg)!;

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function sendReply() {
    if (!reply.trim()) return;
    setMessages((m) => m.map((x) => x.id === activeMsg ? { ...x, text: reply, time: "Just now", unread: false } : x));
    setReply("");
  }

  return (
    <DashboardShell role="tenant" userName="Chinedu A." badge="Tenant">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground">Welcome back, Chinedu</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off, or browse fresh homes.</p>
        </div>
        <Link to="/listings" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Browse rentals</Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashCard title="Saved homes" value={`${savedListings.length}`} hint="Across 2 states" />
        <DashCard title="Open enquiries" value="2" hint="Awaiting host reply" />
        <DashCard title="Successful referrals" value="3" hint="5 more for ₦5,000 bonus" />
        <DashCard title="Referral earnings" value="₦0" hint="Next payout at 8 deals" accent />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <section>
          <SectionTitle title="Saved homes" action={<Link to="/listings" className="text-sm font-semibold text-primary hover:underline">Browse more</Link>} />
          <div className="space-y-3">
            {savedListings.length === 0 && <EmptyBlock text="You haven't saved any homes yet." />}
            {savedListings.map((l) => (
              <div key={l.id} className="flex gap-4 rounded-2xl border border-border bg-card p-3">
                <img src={l.image} alt={l.title} className="h-24 w-32 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link to="/listings/$id" params={{ id: l.id }} className="line-clamp-1 font-display text-base text-foreground hover:text-primary">{l.title}</Link>
                    <button onClick={() => setSaved((s) => s.filter((x) => x !== l.id))} className="text-destructive hover:opacity-80" aria-label="Remove">
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {l.area}, {l.state}</div>
                  <div className="mt-2 text-sm font-semibold text-primary">{formatNaira(l.price)}<span className="text-xs font-medium text-muted-foreground">{l.type === "shortlet" ? " / night" : " / year"}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Messages" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid h-[420px] grid-cols-[140px_1fr] md:grid-cols-[180px_1fr]">
              <div className="overflow-auto border-r border-border">
                {messages.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setActiveMsg(m.id); setMessages((mx) => mx.map((y) => y.id === m.id ? { ...y, unread: false } : y)); }}
                    className={`block w-full border-b border-border px-3 py-3 text-left text-xs transition-colors ${activeMsg === m.id ? "bg-primary-soft" : "hover:bg-muted"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate font-semibold text-foreground">{m.from}</span>
                      {m.unread && <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <div className="mt-0.5 truncate text-muted-foreground">{m.text}</div>
                  </button>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="border-b border-border px-4 py-3">
                  <div className="text-sm font-semibold text-foreground">{conv.from}</div>
                  <div className="text-xs text-muted-foreground">Re: {conv.listing}</div>
                </div>
                <div className="flex-1 space-y-3 overflow-auto p-4 text-sm">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-foreground">{conv.text}</div>
                  <div className="text-[10px] text-muted-foreground">Via Landech middleman, {conv.time}</div>
                </div>
                <div className="flex gap-2 border-t border-border p-3">
                  <input value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendReply()} placeholder="Type a reply" className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
                  <button onClick={sendReply} className="rounded-xl bg-primary px-3 text-primary-foreground hover:bg-primary/90"><Send className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground md:p-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-90"><Gift className="h-4 w-4" /> Referral programme</div>
        <h2 className="mt-3 font-display text-3xl">Earn ₦5,000 for every 8 yearly rent deals you refer.</h2>
        <p className="mt-2 max-w-2xl text-primary-foreground/85">Or every 20 shortlet bookings. Share your unique link, the system pays you automatically when deals close.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1 truncate rounded-xl bg-background/15 px-4 py-3 font-mono text-sm">{referralLink}</div>
          <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground">
            {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy link</>}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-background/10 p-4">
            <div className="text-xs opacity-80">Yearly rent referrals</div>
            <div className="font-display text-2xl">3 / 8</div>
          </div>
          <div className="rounded-2xl bg-background/10 p-4">
            <div className="text-xs opacity-80">Shortlet referrals</div>
            <div className="font-display text-2xl">5 / 20</div>
          </div>
          <div className="rounded-2xl bg-background/10 p-4">
            <div className="text-xs opacity-80">Earnings balance</div>
            <div className="font-display text-2xl">₦0</div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}

function EmptyBlock({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">{text}</div>;
}
