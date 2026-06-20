import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { searchLocations, type LocationOption } from "@/lib/nigeria";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (loc: LocationOption) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function LocationSearch({ value, onChange, onSelect, placeholder, className, autoFocus }: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchLocations(value, 8), [value]);

  useEffect(() => { setHighlight(0); }, [value]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function choose(loc: LocationOption) {
    onChange(loc.label);
    onSelect?.(loc);
    setOpen(false);
  }

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "Enter")) setOpen(true);
            if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => Math.min(h + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
            if (e.key === "Enter" && results[highlight]) { e.preventDefault(); choose(results[highlight]); }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder ?? "Search any city, town or LGA in Nigeria"}
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-xl border border-border bg-card shadow-lift">
          {results.map((loc, i) => (
            <button
              key={loc.key}
              type="button"
              onMouseEnter={() => setHighlight(i)}
              onClick={() => choose(loc)}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                i === highlight ? "bg-primary-soft text-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{loc.lga}</span>
              <span className="text-muted-foreground">· {loc.state}</span>
            </button>
          ))}
        </div>
      )}

      {open && value.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground shadow-lift">
          No matching town or LGA. Try a different spelling.
        </div>
      )}
    </div>
  );
}
