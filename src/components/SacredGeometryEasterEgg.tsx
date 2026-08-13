import { useEffect, useState } from "react";
import { Flower2, X } from "lucide-react";

// Easter egg: type 'flower' to open sacred geometry reference
const TRIGGER = "flower";
const REFERENCE_URL =
  "https://www.perplexity.ai/computer/a/vibesol-master-clock-sync-refe-yU96__2sRc2gfgiu0E8Qgg";

const SacredGeometryEasterEgg = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buffer = "";

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore typing inside inputs/textareas so the shortcut stays hidden and non-intrusive
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      buffer = (buffer + event.key.toLowerCase()).slice(-TRIGGER.length);
      if (buffer === TRIGGER) {
        setOpen(true);
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Sacred geometry reference"
    >
      <div
        className="glass-effect relative max-w-md mx-4 rounded-2xl p-8 space-y-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20">
          <Flower2 className="w-7 h-7 text-primary" />
        </div>

        <h2 className="text-2xl font-bold">Sacred Geometry</h2>
        <p className="text-sm text-muted-foreground">
          You found the flower. VibeSol&apos;s master-clock sync reference and sacred geometry notes
          live here.
        </p>

        <a
          href={REFERENCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-medium text-primary hover:underline break-words"
        >
          Master-clock sync reference ↗
        </a>

        <p className="text-xs text-muted-foreground">
          See <code className="px-1 py-0.5 rounded bg-muted">docs/sacred_geometry_knowledgebase.md</code> on GitHub.
        </p>
      </div>
    </div>
  );
};

export default SacredGeometryEasterEgg;
