/**
 * Landech logo — a unique egg-shaped mark.
 * The egg silhouette (slightly tapered at the top) holds an inset
 * doorway + roof carved from negative space, hinting at "home inside
 * a fresh start". Pure SVG, scales with `size` prop.
 */
export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Egg silhouette (asymmetric ovoid) */}
      <path
        d="M32 3 C46 3 56 19 56 36 C56 51 45 61 32 61 C19 61 8 51 8 36 C8 19 18 3 32 3 Z"
        fill="currentColor"
      />
      {/* Subtle highlight crescent for craft */}
      <path
        d="M16 18 C20 11 26 7 32 6.5 C26 9 22 14 19 22 Z"
        fill="white"
        fillOpacity="0.18"
      />
      {/* House cut into the egg (negative space) */}
      <path
        d="M32 22 L46 33 L46 47 C46 48.1 45.1 49 44 49 L36 49 L36 41 C36 39.9 35.1 39 34 39 L30 39 C28.9 39 28 39.9 28 41 L28 49 L20 49 C18.9 49 18 48.1 18 47 L18 33 L32 22 Z"
        fill="var(--color-background)"
      />
    </svg>
  );
}

/** Wordmark + symbol lockup used in the header / footer. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={36} className="text-primary" />
      <span className="font-display text-[1.4rem] font-extrabold leading-none tracking-tight text-foreground">
        Landech
      </span>
    </span>
  );
}
