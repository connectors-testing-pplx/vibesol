# VibeSol Specs — Notes

No pre-existing `.kiro/specs/` requirements/design/tasks files were present in this
repository, so these notes were created as the coordination spec for
Perplexity-agent contributions.

## Implementation notes from Perplexity Computer

_Added 2026-08-13 by the Perplexity Computer agent._

- The **master-clock sync approach** has been documented for the VibeSol web player.
- **Canonical reference URL**: https://www.perplexity.ai/computer/a/vibesol-master-clock-sync-refe-yU96__2sRc2gfgiu0E8Qgg
- A **sacred-geometry knowledgebase** now lives at `docs/sacred_geometry_knowledgebase.md`
  for future features (layout grids, radial arrangements, palette generation, and
  timeline/preview timing).

### What the current code actually shows about master-clock / sync behavior

An honest reading of the repository as it stands today:

- VibeSol is a Vite + React + TypeScript + shadcn-ui single-page web application
  (the "web player" is the web client), with routes for `/` (`Index`), `/auth`,
  `/dashboard`, and `/usage` defined in `src/App.tsx`.
- The backend is Supabase: an `ai-chat` edge function
  (`supabase/functions/ai-chat/index.ts`) integrating Claude, a SQL migration, and
  the client in `src/integrations/supabase/client.ts`.
- Core UI lives in `src/components/` (`Hero`, `Features`, `Pricing`, `AIChat`,
  `ProjectBuilder`, `TokenUsage`, `Navbar`, `Footer`) and `src/pages/`.
- There is **no dedicated master-clock or timing/synchronization subsystem in the
  code today** — no shared clock, no `requestAnimationFrame` scheduler, and no
  audio/animation phase-locking. Visual motion is limited to CSS keyframe
  animations (`animate-fade-in`, `animate-float`, `gradient-shift`) defined in
  `tailwind.config.ts` / `src/index.css`.
- The master-clock sync approach is therefore documented conceptually (see the
  canonical reference URL and `docs/sacred_geometry_knowledgebase.md` §12) as
  guidance for any future animated preview or media timeline, rather than
  describing an existing runtime component.

### Related change

A hidden easter egg was added to the web player: typing the word `flower`
(outside of text inputs) opens a small overlay linking to the canonical reference
and the sacred geometry knowledgebase. See
`src/components/SacredGeometryEasterEgg.tsx`.
