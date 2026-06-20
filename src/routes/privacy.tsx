import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy policy — Landech" },
    { name: "description", content: "How Landech collects, uses, and protects your data." },
  ]}),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container-page max-w-3xl py-16 md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Legal</span>
        <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="mt-10 space-y-6 text-muted-foreground">
          <Section title="What we collect">
            Account details (name, email, password), identity data for hosts (NIN, ID photo, property documents), listing data, messages routed through the platform, and payment metadata from Paystack.
          </Section>
          <Section title="How we use it">
            To verify hosts, run the middleman messaging system, process shortlet payments, prevent fraud, and improve the platform.
          </Section>
          <Section title="Who we share with">
            NIMC (for NIN verification), Paystack (for payments), Cloudinary/AWS (for image storage), and law enforcement when legally required.
          </Section>
          <Section title="Your rights">
            You can request a copy of your data, ask us to correct it, or close your account. Some data may be retained for fraud-prevention and regulatory reasons.
          </Section>
          <Section title="Security">
            Passwords are hashed with bcrypt. JWT tokens are signed. ID documents are stored encrypted and only viewable by Landech verification staff.
          </Section>
          <Section title="Contact">
            For privacy questions, email privacy@landech.ng.
          </Section>
        </div>
      </article>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <p className="mt-2 leading-relaxed">{children}</p>
    </div>
  );
}
