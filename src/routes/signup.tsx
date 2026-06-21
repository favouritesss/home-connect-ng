import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AuthStyles } from "./login";

type Role = "tenant" | "landlord" | "agent";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account, Landech" }] }),
  component: SignupPage,
});

function SignupPage() {
  const [role, setRole] = useState<Role>("tenant");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-3xl text-foreground">Join Landech</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose the account that fits you.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["tenant", "landlord", "agent"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  role === r
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-card hover:border-foreground/20"
                }`}
              >
                <div className="font-display text-lg capitalize text-foreground">{r}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r === "tenant" && "Browse and enquire about homes."}
                  {r === "landlord" && "List your own property, free."}
                  {r === "agent" && "Manage listings and close deals."}
                </p>
              </button>
            ))}
          </div>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name"><input required className="auth-input" placeholder="Adaeze Okeke" /></Field>
              <Field label="Phone"><input required className="auth-input" placeholder="0801 234 5678" /></Field>
            </div>
            <Field label="Email"><input type="email" required className="auth-input" placeholder="you@example.com" /></Field>
            <Field label="Password"><input type="password" required className="auth-input" placeholder="At least 8 characters" /></Field>

            {(role === "landlord" || role === "agent") && (
              <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm">
                <div className="font-semibold text-foreground">Verification required</div>
                <p className="mt-1 text-muted-foreground">
                  {role === "landlord"
                    ? "You'll be asked for your NIN, property documents, utility bill, and a selfie before your listing goes live."
                    : "You'll be asked for your NIN (one per agent, verified via NIMC) and an optional CAC certificate."}
                </p>
              </div>
            )}

            <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Create my {role} account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Sign-up is a preview, backend wiring (NIN, email verification, JWT) comes next.
          </p>
        </div>
      </section>
      <Footer />
      <AuthStyles />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}
