# MASTER_UI_PROMPT.md
> **Reusable Screen-Building Instruction Template for Novas Defence & Maritime Portal**  
> *Governed by Anthropic Frontend Design Aesthetics, shadcn/ui Component Standards, and Vercel Web Design Guidelines.*

---

## 1. MISSION & PRODUCT IDENTITY
You are building screens for **Novas Defence & Maritime Portal** — an institutional B2B & B2G digital procurement and naval engineering platform connecting armed forces, coast guards, port authorities, and commercial fleet managers with certified global OEMs and shipyards.

### Tone & Personality
- **Authoritative & Mission-Ready:** Zero generic SaaS fluff. Every pixel must feel precise, durable, and defense-grade.
- **Data-Dense & Legible:** High information density without clutter. Technical specifications (NIJ, MIL-STD, IMO/SOLAS, LOA, BHP, knots) must take center stage.
- **Oceanic & Tactical Aesthetics:** Deep navy and abyss slate (`#040911`, `#081322`), illuminated by crisp technical typography and high-visibility Signal Amber (`#F59E0B`) or Marine Blue (`#0284C7`) focal points.

---

## 2. DESIGN TOKENS & STYLE ENFORCEMENT
All screens **must strictly bind** to the design tokens declared in [`styles/tokens.css`](file:///home/mehedi/Documents/clientproject/styles/tokens.css).

```css
/* Core Palette Mapping */
Background: var(--bg-abyss) / #040911
Card / Surface: var(--bg-deep-navy) / #081322 (border: var(--border-default))
Surface Elevated / Hover: var(--bg-bridge) / #0d1e34
Text Primary: var(--text-primary) / #f8fafc
Text Secondary: var(--text-secondary) / #cbd5e1
Text Muted / NATO Codes: var(--text-muted) / #849bb5
Accent Primary (RFQ, Badges, Highlights): var(--accent-amber) / #f59e0b
Accent Marine (Vessels, Ocean Tech): var(--accent-marine) / #0284c7
Status Verified (MIL-SPEC, Active Fleet): var(--status-sonar-green) / #10b981
```

### Typography Hierarchy:
1. **Headings & Display:** `font-display` (`Cabinet Grotesk` or `Plus Jakarta Sans`) with `tracking-tight`.
2. **Body & UI Elements:** `font-sans` (`Inter`), balanced line-height `leading-normal`.
3. **Telemetry, Dimensions & NATO Spec Codes:** `font-mono` (`JetBrains Mono`), uppercase `tracking-widest`, with tabular numbers enabled (`font-features-tech`).

---

## 3. SCREEN-BUILDING WORKFLOW & PROMPT TEMPLATE

When assigned to build a new screen (e.g., *Product Detail*, *Vessel Showcase*, *RFQ Wizard*, *Sector Deep-Dive*), follow this exact structure:

```markdown
### Screen Implementation Brief: [Screen Name]

#### A. Role & User Goal
- **Target User:** [e.g., Naval Procurement Officer / Fleet Superintendent]
- **Primary Objective:** [e.g., Compare patrol boat propulsion options & submit custom tender RFQ]
- **Key Decision Points:** [e.g., Range in NM, delivery lead-time, classification society certification]

#### B. Component Composition (shadcn/ui Based)
- Layout primitives: `Container`, `Grid`, `Card`, `Badge`, `Button`, `Table`, `Dialog`, `Tabs`
- Specialized domain widgets:
  - `SpecMatrixTable`: High-density key-value list with certification pill tags.
  - `VesselProfileCard`: 16:10 aspect ratio render, LOA/Beam/Draft telemetry HUD.
  - `RfqActionDrawer`: Direct quotation form with delivery timeline & tender attachments.

#### C. Visual & Layout Rules
- **Header:** Sticky frosted glass header (`backdrop-blur-xl bg-background/80 border-b border-border/60`).
- **Hero / Context Banner:** Sector indicator tag, bold primary headline, tactical metric counter chips.
- **Grid Layout:** 12-column responsive layout (1 col on mobile <640px, 2 col on tablet 768px, 3 or 4 col on desktop >1024px).
- **Cards & Surfaces:** `rounded-xl border border-border/60 bg-card p-6 shadow-sm hover:border-accent/40 hover:-translate-y-0.5 transition-all`.
- **Media Containers:** Strict aspect ratio wrappers (`aspect-[16/10]` or `aspect-[4/3]`) with subtle vignette gradients to prevent Layout Shift (CLS).

#### D. The 5 Mandatory Screen States
Every screen component MUST provide complete implementations for all 5 states:
1. **Populated (Default) State:** Full data loaded with all badges, telemetry, and actions active.
2. **Loading State:** Skeleton loaders matching the EXACT dimensions and geometry of the content cards and tables. Never display a lone generic spinner in the screen center.
3. **Empty State:** Distinct zero-state graphic/icon, military-style status header ("NO RECORDS MATCH CRITERIA"), clear diagnostic message, and a primary reset action (e.g. "Clear Filters", "Browse Full Catalogue").
4. **Error State:** Non-blocking error banner or card boundary with specific error code, explanation, and an actionable retry CTA.
5. **Interactive / Active States:**
   - Buttons: Hover glow, active press `scale-[0.98]`, keyboard focus ring (`ring-2 ring-accent ring-offset-2`).
   - Cards: Subtle elevate on hover (`-translate-y-1`), border brightening.
   - Dropdowns/Modals: Smooth fade-in, focus trap enabled, `ESC` keyboard dismiss.
```

---

## 4. DOMAIN-SPECIFIC UI PATTERNS (DEFENCE & MARITIME)

### 1. Technical Spec Badge Syntax
Always format technical certifications using standardized pill badges:
```html
<!-- Example Certified Spec Pill -->
<span class="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 font-mono text-xs font-semibold text-metal border border-border">
  <span class="size-1.5 rounded-full bg-status-sonar-green animate-pulse"></span>
  NIJ 0106.01 Level IIIA
</span>
```

### 2. Vessel Telemetry Metric Strip
When displaying workboats or maritime craft, format specs in a 4-column HUD:
- **LOA (Length Overall):** e.g., `24.50 m`
- **Beam:** e.g., `6.80 m`
- **Max Speed:** e.g., `28.5 Knots`
- **Bollard Pull / Power:** e.g., `45 Tonnes / 2x 1200 BHP`

### 3. High-Conversion RFQ (Request for Quotation) Drawer
Institutional buyers do not use consumer shopping carts. Use a tender quotation inquiry drawer with:
- Target Delivery Port / Country (e.g., Chattogram, Mongla, Regional).
- Tender Reference Number (optional).
- End-User Certification declaration checkbox (EU/Government end-user).
- Quantity specification and requested delivery timeframe (e.g. 30/60/90 days).

---

## 5. TECHNICAL & ACCESSIBILITY CONSTRAINTS (Vercel Guidelines)

1. **Touch Target Size:** Every interactive target (buttons, filter chips, pagination) must be at least `44x44px` on mobile/tablet.
2. **Contrast Strictness:**
   - Normal text (14px/16px) contrast ≥ `4.5:1` against its background.
   - Large text (≥18px bold or ≥24px regular) contrast ≥ `3:0`.
   - Never place low-contrast grey text (`#64748B`) directly on dark navy surfaces without verifying compliance.
3. **Semantic HTML:**
   - Use `<main id="main-content">`, `<nav aria-label="...">`, `<article>`, `<section>`, and `<table>` with `<thead>`, `<tbody>`, and `<th scope="col">`.
   - Never use `div` for buttons; always use `<button type="button">`.
4. **Form Association:**
   - Every input has an explicit `<label htmlFor="...">`.
   - Validation errors use `aria-invalid="true"` and `aria-describedby="[id]-error"`.
5. **No Layout Shift (CLS = 0):**
   - All images and embeds must define `width`, `height`, or strict `aspect-ratio` containers.
