import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of use, Landech" },
    { name: "description", content: "The terms that govern your use of the Landech platform." },
  ]}),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container-page max-w-3xl py-16 md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Legal</span>
        <h1 className="mt-5 font-display text-4xl text-foreground md:text-5xl">Terms of use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="prose mt-10 space-y-6 text-muted-foreground">
          <Section title="1. Acceptance">
            By creating an account or using Landech, you agree to these terms. If you don't agree, please don't use the platform.
          </Section>
          <Section title="2. Account types">
            Landech offers separate accounts for tenants, landlords, and agents. Each NIN may register one host account. Switching account type requires admin approval.
          </Section>
          <Section title="3. Listings & honesty">
            All listings must be accurate. All fees (agency, caution) must be declared upfront. Misleading listings will be removed and may result in account suspension.
          </Section>
          <Section title="4. Middleman enquiries">
            All initial communication between renters and hosts must happen through Landech. Attempting to bypass the platform to evade fees may result in account suspension and NIN blacklisting.
          </Section>
          <Section title="5. Payments">
            Yearly rent is paid offline directly to the host. Shortlet bookings are processed through Paystack on the platform; Landech retains 10% and remits 90% to the host on check-in.
          </Section>
          <Section title="6. Closure fee (agents)">
            Agents owe Landech a ₦10,000 closure fee upon marking a yearly rent deal closed. Unpaid invoices result in account suspension and NIN blacklisting.
          </Section>
          <Section title="7. Refunds">
            If a shortlet host cancels after payment, the renter receives a full automatic refund.
          </Section>
          <Section title="8. Prohibited conduct">
            No fraud, harassment, discrimination, fake listings, or off-platform money requests. Violations may result in permanent ban.
          </Section>
          <Section title="9. Liability">
            Landech provides a platform for connections and (for shortlets) escrow. We are not party to long-term tenancy contracts between landlords and tenants.
          </Section>
          <Section title="10. Changes">
            We may update these terms; you'll be notified of material changes via email or dashboard.
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
