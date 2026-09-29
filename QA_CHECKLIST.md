# QA_CHECKLIST.md
> **Production Quality Assurance & Design Review Checklist**  
> *Novas Defence & Maritime Portal — Required gate before marking any screen complete.*

---

## 1. VISUAL DESIGN & TOKEN ADHERENCE (Frontend Design Audit)
- [ ] **Color Token Fidelity:** All colors resolve strictly to `styles/tokens.css` CSS custom variables. No hardcoded arbitrary HEX/RGB values (e.g. `text-[#fff]` or `bg-[#123]`) in component files.
- [ ] **Typography Scale:**
  - [ ] Headers use `font-display` with tight tracking (`tracking-tight`).
  - [ ] Body copy uses `font-sans` with comfortable line-height (`leading-normal` or `leading-relaxed`).
  - [ ] Telemetry, specs, codes, and dimensions use `font-mono` with tabular numbers enabled.
- [ ] **Elevation & Borders:** Cards have subtle, consistent alpha borders (`border-border/60`) and soft tactical drop-shadows. No harsh opaque outlines.
- [ ] **Accent Restraint:** Signal Amber (`--accent-amber`) and Marine Cyan (`--accent-marine`) are used strategically for primary CTAs, active filters, and compliance highlights — never dominating entire backgrounds.
- [ ] **Anti-Generic Aesthetic Check:** The interface looks like a dedicated, mission-critical defense/naval system, avoiding generic purple/gray AI-generated templates.

---

## 2. RESPONSIVENESS & ADAPTIVE LAYOUTS
- [ ] **Mobile (375px - 430px):**
  - [ ] Hamburger/mobile drawer works smoothly without page overflow or jank.
  - [ ] Horizontal scrolling is eliminated (`body` overflow-x = hidden).
  - [ ] Multi-column grids collapse cleanly into single-column or compact cards.
  - [ ] Tables support horizontal swipe with sticky row headers or convert to mobile spec cards.
- [ ] **Tablet (768px - 1024px):**
  - [ ] 2-column or 3-column balance without awkward gaps or text truncation.
  - [ ] Filter bars and search controls remain comfortably positioned.
- [ ] **Desktop & Ultrawide (1280px - 1920px+):**
  - [ ] Max-width container (`--container-max` = 1312px) prevents awkward stretching on 4K/ultrawide displays.
  - [ ] High-density spec cards maintain harmonious margins and optical alignment.

---

## 3. THE 5 MANDATORY COMPONENT STATES
- [ ] **1. Populated (Default) State:**
  - [ ] Realistic domain dummy data (e.g. "Ballistic Helmet Mk-III", "Tugboat Loyd-2400", "X-Band Marine Radar").
  - [ ] All certification tags, dimensions, and CTA buttons render properly.
- [ ] **2. Loading State:**
  - [ ] Skeletons match the exact geometry, height, and border-radius of the target content cards.
  - [ ] Skeletons pulse with a subtle dark-navy shimmer (no jarring stark white blocks).
  - [ ] No isolated generic spinners in the middle of a blank canvas.
- [ ] **3. Empty State:**
  - [ ] Clear nautical/tactical zero-state illustration or icon (e.g. radar sweep, anchor, shield).
  - [ ] Informative title ("No Equipment Found") and diagnostic message explaining why.
  - [ ] Primary recovery button ("Reset All Filters" or "Request Custom Sourcing").
- [ ] **4. Error State:**
  - [ ] Graceful fallback if data fails to fetch or form submission errors out.
  - [ ] Clear error explanation with a working "Retry" action.
  - [ ] Does not crash or unmount adjacent navigation or layout elements.
- [ ] **5. Interactive & Feedback States:**
  - [ ] Hover: Card borders subtly illuminate; buttons transition smoothly (180ms ease).
  - [ ] Active/Pressed: Buttons slightly compress (`scale-[0.98]`).
  - [ ] Focus: High-visibility focus ring (`ring-2 ring-accent ring-offset-2`).

---

## 4. ACCESSIBILITY & USABILITY (Vercel Guidelines Audit)
- [ ] **Color Contrast (WCAG AA/AAA):**
  - [ ] Body copy against dark navy background has a contrast ratio ≥ `4.5:1`.
  - [ ] Primary buttons and badges have high-contrast foreground text (e.g. dark text on amber button).
- [ ] **Touch Target Sizing:**
  - [ ] All interactive buttons, filter pills, dropdown toggles, and links are at least `44x44px` on touch screens.
- [ ] **Keyboard Navigation:**
  - [ ] Complete workflow can be operated with `Tab`, `Shift+Tab`, `Enter`, and `Space`.
  - [ ] Modals and drawers close with `Escape` and trap focus while open.
  - [ ] Visible focus rings on all interactive elements without relying on mouse hover.
- [ ] **Semantic HTML & Screen Reader Support:**
  - [ ] Proper landmarks used: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
  - [ ] Headings follow logical order (`h1` -> `h2` -> `h3`) without skipping levels for visual styling.
  - [ ] All icon-only buttons include descriptive `aria-label` (e.g. `aria-label="Close RFQ Drawer"`).
  - [ ] Expandable components (menus, accordions) manage `aria-expanded` and `aria-controls`.
- [ ] **Form Ergonomics:**
  - [ ] Every form field has an explicit `<label htmlFor="...">`.
  - [ ] Required fields are visibly indicated and carry `required` or `aria-required="true"`.
  - [ ] Inline validation errors link to fields via `aria-describedby="[field]-error"`.

---

## 5. TECHNICAL PERFORMANCE & CODE QUALITY
- [ ] **Zero Cumulative Layout Shift (CLS):**
  - [ ] All images, diagrams, and hero media wrappers have explicit `aspect-ratio` or `width`/`height` props.
- [ ] **Console Cleanliness:**
  - [ ] Zero unhandled JavaScript errors in the browser developer console.
  - [ ] Zero React key warnings (`Each child in a list should have a unique 'key' prop`).
  - [ ] Zero hydration mismatch warnings.
- [ ] **Asset Optimization:**
  - [ ] Images served in modern formats (WebP/AVIF) with lazy-loading enabled for below-the-fold elements.
  - [ ] Vector icons rendered via lightweight SVG (Lucide / Radix Icons).

---

## 6. SIGN-OFF GATE
| Verification Area | Auditor | Status | Notes |
| :--- | :--- | :--- | :--- |
| Design System & Tokens | Product Designer | `[ ] PASS / [ ] FAIL` | |
| Responsiveness & Cross-Device | Frontend Engineer | `[ ] PASS / [ ] FAIL` | |
| Accessibility & 5-State Completeness | QA Engineer | `[ ] PASS / [ ] FAIL` | |
| Final Acceptance | Lead Architect | `[ ] APPROVED` | Ready for production deployment |
