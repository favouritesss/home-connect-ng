import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell, DashCard, SectionTitle } from "@/components/dashboard/DashboardShell";
import { LISTINGS, formatNaira, PROPERTY_TYPES, type Status } from "@/lib/listings";
import { STATES, NIGERIA } from "@/lib/nigeria";
import { PlusCircle, Edit3, Trash2, ShieldCheck, FileText, Upload, Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/landlord")({
  head: () => ({ meta: [{ title: "Landlord dashboard, Landech" }] }),
  component: LandlordDashboard,
});

interface MyListing { id: string; title: string; state: string; area: string; price: number; type: "long-term" | "shortlet"; status: Status; image: string; }

function LandlordDashboard() {
  const [listings, setListings] = useState<MyListing[]>(
    LISTINGS.slice(0, 3).map((l) => ({ id: l.id, title: l.title, state: l.state, area: l.area, price: l.price, type: l.type, status: l.status, image: l.image }))
  );
  const [showForm, setShowForm] = useState(false);
  const [docs, setDocs] = useState({ nin: true, property: true, utility: false, selfie: false });

  const verified = Object.values(docs).every(Boolean);
  const monthlyRevenue = listings.filter((l) => l.type === "shortlet").length * 240000;

  function updateStatus(id: string, status: Status) {
    setListings((ls) => ls.map((l) => l.id === id ? { ...l, status } : l));
  }
  function removeListing(id: string) {
    setListings((ls) => ls.filter((l) => l.id !== id));
  }

  return (
    <DashboardShell role="landlord" userName="Hajia Salamatu I." badge={verified ? "Verified Landlord" : "Verification pending"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground">Landlord dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your properties, enquiries and verification, all in one place.</p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-4 w-4" /> {showForm ? "Close form" : "Add listing"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashCard title="Active listings" value={`${listings.filter((l) => l.status !== "Rented").length}`} hint={`${listings.length} total`} />
        <DashCard title="Enquiries this week" value="14" hint="+3 vs last week" />
        <DashCard title="Shortlet revenue" value={formatNaira(monthlyRevenue)} hint="This month" />
        <DashCard title="Trust badge" value={verified ? "Verified" : "Pending"} hint={verified ? "All documents approved" : "Complete verification"} accent={verified} />
      </div>

      {showForm && <AddListingForm onCreate={(l) => { setListings((ls) => [l, ...ls]); setShowForm(false); }} />}

      <section className="mt-10">
        <SectionTitle title="My listings" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-4 py-3">Property</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={l.image} alt="" className="h-10 w-14 rounded object-cover" />
                      <div className="font-medium text-foreground">{l.title}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{l.area}, {l.state}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{formatNaira(l.price)}<span className="text-xs font-normal text-muted-foreground">{l.type === "shortlet" ? " /nt" : " /yr"}</span></td>
                  <td className="px-4 py-3">
                    <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value as Status)} className="rounded-lg border border-border bg-background px-2 py-1 text-xs">
                      <option>Available</option><option>Under Negotiation</option><option>Rented</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="mr-2 inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:bg-muted"><Edit3 className="h-3 w-3" /> Edit</button>
                    <button onClick={() => removeListing(l.id)} className="inline-flex items-center gap-1 rounded-lg border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /></button>
                  </td>
                </tr>
              ))}
              {listings.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No listings yet. Add your first property above.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle title="Verification documents" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className={`h-4 w-4 ${verified ? "text-success" : "text-muted-foreground"}`} />
              <span className="font-semibold">{verified ? "All documents approved" : "Complete all documents to get your Verified badge"}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { k: "nin" as const, label: "NIN (National ID)" },
                { k: "property" as const, label: "Property documents (C of O or receipt)" },
                { k: "utility" as const, label: "Utility bill for the property" },
                { k: "selfie" as const, label: "Selfie holding your NIN card" },
              ].map((d) => (
                <li key={d.k} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                  <span className="flex items-center gap-2 text-foreground"><FileText className="h-4 w-4 text-muted-foreground" /> {d.label}</span>
                  <button onClick={() => setDocs((x) => ({ ...x, [d.k]: !x[d.k] }))} className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${docs[d.k] ? "bg-success/15 text-success" : "bg-muted text-foreground"}`}>
                    {docs[d.k] ? <><Check className="h-3 w-3" /> Uploaded</> : <><Upload className="h-3 w-3" /> Upload</>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <SectionTitle title="Recent enquiries" />
          <div className="space-y-3">
            {[
              { name: "Chinedu A.", listing: "Modern 2 Bedroom, Lekki", time: "2h ago" },
              { name: "Aisha M.", listing: "Mini Flat, Surulere", time: "Yesterday" },
              { name: "Tobi K.", listing: "Self-contained, Yaba", time: "3 days ago" },
            ].map((e, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <div>
                  <div className="font-semibold text-foreground">{e.name}</div>
                  <div className="text-xs text-muted-foreground">Re: {e.listing}, {e.time}</div>
                </div>
                <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Reply</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}

function AddListingForm({ onCreate }: { onCreate: (l: MyListing) => void }) {
  const [title, setTitle] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState<"long-term" | "shortlet">("long-term");
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);

  const lgas = state ? NIGERIA.find((s) => s.state === state)?.lgas ?? [] : [];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !state || !area || !price) return;
    onCreate({
      id: `new-${Date.now()}`,
      title, state, area,
      price: Number(price),
      type, status: "Available",
      image: LISTINGS[Math.floor(Math.random() * LISTINGS.length)].image,
    });
  }

  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-xl text-foreground">New listing</h3>
      <p className="text-sm text-muted-foreground">Listing is free for landlords. Your post goes live once verification is approved.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. 2 Bedroom Flat in Ikeja GRA" className="inp" /></Field>
        <Field label="Property type">
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as typeof propertyType)} className="inp">
            {PROPERTY_TYPES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="State">
          <select value={state} onChange={(e) => { setState(e.target.value); setArea(""); }} className="inp">
            <option value="">Pick state</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="LGA">
          <select value={area} onChange={(e) => setArea(e.target.value)} className="inp" disabled={!state}>
            <option value="">{state ? "Pick LGA" : "Pick state first"}</option>
            {lgas.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="Rental type">
          <select value={type} onChange={(e) => setType(e.target.value as "long-term" | "shortlet")} className="inp">
            <option value="long-term">Long-term (yearly)</option>
            <option value="shortlet">Shortlet (per night)</option>
          </select>
        </Field>
        <Field label={type === "shortlet" ? "Price per night (₦)" : "Yearly rent (₦)"}>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 1200000" className="inp" />
        </Field>
      </div>
      <button type="submit" className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Publish listing</button>
      <style>{`.inp { width:100%; border:1px solid var(--color-border); border-radius:.5rem; padding:.5rem .625rem; font-size:.875rem; background:var(--color-background); outline:none; } .inp:focus { border-color:var(--color-ring); }`}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>{children}</label>;
}
