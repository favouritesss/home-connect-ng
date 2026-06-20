import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Landech — We're here to help" },
      { name: "description", content: "Reach the Landech team. We respond to most messages within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Contact</span>
          <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Talk to the Landech team.</h1>
          <p className="mt-4 text-muted-foreground">
            Whether you have a question about a listing, a complaint about a host, or
            you're a press/partnership enquiry — we'd love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            {sent ? (
              <div className="rounded-xl bg-primary-soft p-6 text-primary">
                <h3 className="font-display text-xl">Message received</h3>
                <p className="mt-2 text-sm">Thanks — a member of our team will reply within 1 business day.</p>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" placeholder="Chinonso A." required />
                  <Input label="Email" type="email" placeholder="you@example.com" required />
                </div>
                <Input label="Subject" placeholder="What's it about?" required />
                <Field label="Message">
                  <textarea required rows={6} placeholder="How can we help?" className="contact-input resize-y" />
                </Field>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  <Send className="h-4 w-4" /> Send message
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <InfoCard icon={<Mail />} title="Email" body="hello@landech.ng" />
            <InfoCard icon={<Phone />} title="Phone (WhatsApp)" body="+234 800 LANDECH" />
            <InfoCard icon={<MapPin />} title="Office" body="Yaba, Lagos · serving all 36 states + FCT" />
            <InfoCard icon={<MessageSquare />} title="In-app messaging" body="Logged-in users can message admin from their dashboard." />
          </aside>
        </div>
      </section>
      <Footer />

      <style>{`
        .contact-input {
          width: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.625rem;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
        }
        .contact-input:focus { border-color: var(--color-ring); }
      `}</style>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <Field label={label}><input {...props} className="contact-input" /></Field>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-semibold text-foreground">{label}</span>{children}</label>;
}
function InfoCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-0.5 text-sm text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}
