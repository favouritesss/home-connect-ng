import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Landech" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-page grid place-items-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-3xl text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Landech account.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="Email"><input type="email" required className="auth-input" placeholder="you@example.com" /></Field>
            <Field label="Password"><input type="password" required className="auth-input" placeholder="••••••••" /></Field>
            <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Landech?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Authentication is not connected yet — this is a preview of the sign-in screen.
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

export function AuthStyles() {
  return (
    <style>{`
      .auth-input {
        width: 100%;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 0.625rem;
        padding: 0.625rem 0.75rem;
        font-size: 0.875rem;
        color: var(--color-foreground);
        outline: none;
      }
      .auth-input:focus { border-color: var(--color-ring); }
    `}</style>
  );
}
