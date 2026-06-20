import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Heart, ShieldCheck, Globe2, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Landech — Renting in Nigeria, made human" },
      { name: "description", content: "We're rebuilding Nigerian renting around trust, transparency, and verified people. Learn the mission behind Landech." },
      { property: "og:title", content: "About Landech" },
      { property: "og:description", content: "We're rebuilding Nigerian renting around trust, transparency, and verified people." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">About us</span>
        <h1 className="mt-5 max-w-3xl font-display text-4xl text-foreground md:text-5xl">
          A renting platform Nigerians can actually trust.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
          Landech is a Nigerian rental platform built for students, young professionals,
          and families. We exist to make finding a home — across all 36 states and the
          FCT — simple, transparent, and free of unnecessary fees and confusion.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: <ShieldCheck className="h-5 w-5" />, t: "Trust first", b: "Every listing host is identity-verified through NIMC before they can post." },
            { i: <Heart className="h-5 w-5" />, t: "Renter-first", b: "Tenants never pay Landech. Hosts earn the platform's keep, not you." },
            { i: <Globe2 className="h-5 w-5" />, t: "Nationwide", b: "From Lagos and Abuja to Maiduguri, Calabar, and every town between." },
            { i: <Users className="h-5 w-5" />, t: "Community-owned growth", b: "Referral bonuses reward the users who help us grow." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">{x.i}</span>
              <h3 className="mt-4 font-display text-xl text-foreground">{x.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{x.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-3xl bg-surface p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-display text-3xl text-foreground">Our mission</h2>
            <p className="mt-3 text-muted-foreground">
              To make renting in Nigeria simple, transparent, and free of unnecessary fees
              and confusion. Landech is not just a listing site — it is a trust-first
              platform that puts tenants and honest landlords and agents first.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-foreground">Our vision</h2>
            <p className="mt-3 text-muted-foreground">
              Become the default place Nigerians look when they want a home — and then
              expand across Africa, carrying with us the same standards of safety,
              transparency, and respect for the people who use the platform.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/listings" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Browse rentals</Link>
          <Link to="/contact" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">Talk to us</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
