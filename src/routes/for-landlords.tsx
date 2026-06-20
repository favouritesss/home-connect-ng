import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BadgeCheck, Camera, FileText, ShieldCheck, Upload, UserCheck } from "lucide-react";

export const Route = createFileRoute("/for-landlords")({
  head: () => ({ meta: [
    { title: "List your property free — for landlords | Landech" },
    { name: "description", content: "Post your property directly, with no agency fees. Get a Verified Landlord badge and reach serious renters nationwide." },
  ]}),
  component: ForLandlords,
});

function ForLandlords() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">For landlords</span>
            <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">List your property — free, forever.</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Skip the agent middlemen. Post directly, attach the "Direct from Landlord"
              badge, and talk to serious renters through our protected messaging system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Create landlord account</Link>
              <Link to="/how-it-works" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">How it works</Link>
            </div>
          </div>
          <div className="rounded-3xl bg-surface p-8">
            <h3 className="font-display text-xl text-foreground">What you get</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                ["₦0", "to list. Always."],
                ["Verified Landlord badge", "after document review"],
                ["Direct enquiries", "no agents diluting your message"],
                ["Listing dashboard", "edit, pause, mark rented"],
                ["Middleman safety", "all messages traceable"],
              ].map(([h, b]) => (
                <li key={h} className="flex gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span><span className="font-semibold text-foreground">{h}</span> — {b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl text-foreground">Verification: 4 simple documents</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            We verify ownership so renters can trust your listing. Admin review takes 24–48 hours.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: <UserCheck />, t: "NIN", b: "National Identification Number — verified via NIMC." },
              { i: <FileText />, t: "Property documents", b: "C of O or signed purchase receipt." },
              { i: <Upload />, t: "Utility bill", b: "Recent bill for the property address." },
              { i: <Camera />, t: "Selfie with NIN", b: "Confirms you're the document holder." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">{x.i}</span>
                <h3 className="mt-3 font-display text-lg text-foreground">{x.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{x.b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:px-14">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-8 w-8" />
            <div>
              <h3 className="font-display text-2xl">Your contact details are never exposed.</h3>
              <p className="mt-2 max-w-2xl text-primary-foreground/80">
                Every enquiry comes to you through Landech. You decide what to share and when.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
