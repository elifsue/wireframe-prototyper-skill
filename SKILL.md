---
name: wireframe-prototyper
description: Build interactive low-fidelity wireframes and/or high-fidelity prototypes of websites as a deployed web application. Use when the user asks to create wireframes, prototypes, mockups, or design screens for a website or web app.
---

# Wireframe Prototyper

Build interactive website wireframes and prototypes as a deployed web application with dual-fidelity mode switching (Lo-Fi / Hi-Fi), a Material Design 3 color system, screen navigation sidebar, and presentation tools (fullscreen, Figma Capture mode).

## Workflow

### Phase 1: Discovery Questions

Before implementation, ask the user these questions **one at a time** like an interview. Wait for the user's response to each question before asking the next one. Do NOT batch multiple questions together.

**Question order:**

1. **Fidelity scope** — Do you need both low-fidelity wireframes and high-fidelity prototype, or just one? (If both, Hi-Fi is the default mode on load.)
2. **Competitor analysis** — Is there a competitor website to analyse and draw inspiration from? (If yes, browse it first to understand patterns, layout, and features before continuing.)
3. **Feature clarification** — Before suggesting screens, ask the user about specific features you are uncertain about. For example: "Do you need user authentication?", "Should there be a messaging system?", "Do you need a payment/checkout flow?", etc. Ask about features that are ambiguous or not explicitly mentioned — do NOT assume features exist. Tailor these questions to the type of website being built.
4. **Screen list** — After understanding the confirmed features, suggest as many screens as possible to ensure the website feels complete and covers the full user journey. Think through every flow (authentication, onboarding, core features, settings, error states, empty states, informational pages, etc.) and propose a comprehensive list. The website should NOT feel incomplete or missing key pages. Present the suggested screens grouped by section, then listen to the user's additions/removals/reordering.
5. **Project name** — Suggest a name for the prototype website and confirm.
6. **Color palette** — Ask which color palette style they prefer (warm, cool, earthy, vibrant, etc.). Generate a full M3-compliant palette from their preference and add it as the default on top of the built-in presets. The generated palette MUST pass all WCAG contrast checks (AA minimum for body text, AAA for large text).
7. **Typography** — Ask and suggest a font family to use for the website (e.g., Inter, Poppins, Nunito, DM Sans). Confirm with the user before proceeding. Load the chosen font via Google Fonts CDN in `client/index.html`.

### Phase 2: Setup

1. Initialize a webdev project (static or server template depending on needs — typically static is sufficient for wireframes).
2. Copy and adapt the template files from this skill's `templates/` directory into the `client/src/tools/` folder:
   - `AppShell.tsx` → `client/src/tools/AppShell.tsx`
   - `ScreensSidebar.tsx` → `client/src/tools/ScreensSidebar.tsx`
   - `Toolbar.tsx` → `client/src/tools/Toolbar.tsx`
   - `ColorPaletteTool.tsx` → `client/src/tools/ColorPaletteTool.tsx`
   - `screens.ts` → `client/src/tools/screens.ts`
3. Copy context files:
   - `FidelityModeContext.tsx` → `client/src/contexts/FidelityModeContext.tsx`
   - `DesignSystem.ts` → `client/src/contexts/DesignSystem.ts`
   - `DesignSystemContext.tsx` → `client/src/contexts/DesignSystemContext.tsx`
   - `dsPresets.ts` → `client/src/contexts/dsPresets.ts`
4. Copy `routes.ts` → `client/src/routes.ts`. Update the route entries to match the project's screens.
5. Update `dsPresets.ts`: Add the user's custom palette as the first item in `DS_PRESETS`. Keep the standard built-in presets (Ocean Breeze, Midnight Violet, Emerald Garden, Arctic Frost, Berry Dusk, Slate & Citrus) below it. `DEFAULT_DS_COLORS` automatically references the first preset.
6. Update `screens.ts`: Replace the screen entries with the project's actual screens (label, path pairs).
7. Set up providers in `App.tsx`: `ErrorBoundary` > `ThemeProvider` > `DesignSystemProvider` > `FidelityModeProvider` > `Router` > `AppShell`.
8. Read ALL reference files before proceeding to Phase 3.

### Phase 3: Design System Components

Before building any screens, create reusable components that enforce the design system. Each component MUST be in its own separate file under `client/src/components/`.

**Required components** (adapt names to project):
- `ActionButton` — Primary/secondary/outlined/destructive variants; uses DS tokens in Hi-Fi, black/white in Lo-Fi
- `TextInputField` — Single-line input; no placeholder in Lo-Fi, DS-styled in Hi-Fi
- `TextInputFieldMultiLine` — Multi-line textarea
- `SelectInputField` — Dropdown select
- `ImagePlaceholder` — Crossbox in Lo-Fi, fake/placeholder image in Hi-Fi (use relevant stock-style images or colored rectangles with icons)
- `TextPlaceholder` — Black lines in Lo-Fi, real text in Hi-Fi
- `NavigationBar` — Top nav bar
- `Footer` — Page footer
- `ProductCard` / `ListItem` — Reusable content cards
- `SearchBar`, `TabItem`, `ChipItem`, `BadgeLabel`, `Avatar`, `Checkbox`, `RadioButton`, `Switch`, `ProgressBar`, `RatingBar`, `PaginationBar`, `Carousel`, `SectionHeader`, `PageHeader`, `Accordion`

Each component must branch on `isLofi` / `isHifi` from `useFidelityMode()`.

### Phase 4: Screen Implementation

Build screens one at a time. Each screen MUST be very detailed in its implementation. Do not create sparse or skeleton-like screens. Every section, form field, label, button, list item, and piece of content that would exist in a real production app should be present. The screens should feel complete and thorough, not like placeholders waiting to be filled in later.

Each screen file goes in `client/src/screens/`:
- Imports `useFidelityMode()` and `useDSSync()`
- Renders completely different markup for Lo-Fi vs Hi-Fi (or shared structure with conditional styling)
- Uses only the design system components created in Phase 3
- Includes working navigation links between screens (both fidelity modes)

### Phase 5: Compliance Verification

After all screens are implemented, go through the entire project and verify it follows all rules:

1. Verify that all files in the `tools/` folder are untouched, except for updating the TODOs in `dsPresets.ts`, `routes.ts`, and `screens.ts` with the project's data.
2. Re-read `references/DESIGN_RULES_REFERENCE.md` and check every rule against the implementation (component-per-file, min-height 900px, flex-grow content, spacing scale, Gestalt principles, Figma Capture patterns, navigation between screens).
3. Re-read `references/HIGH_FIDELITY_PROTOTYPE_REFERENCE.md` and verify Hi-Fi mode compliance (DS tokens used everywhere, colors update in real-time when changed via the Color Palette Tool, hover states on all clickable elements, real generated images in every slot, proper typography, border radius/elevation).
4. Re-read `references/LOW_FIDELITY_WIREFRAME_REFERENCE.md` and verify Lo-Fi mode compliance (black/white only, crossbox placeholders, text as lines, no rounded corners, no hover states, empty inputs with no hints).
5. Fix any violations found during the audit before delivering to the user.

## Rules

All design and implementation rules are documented in the reference files. You MUST read all of them before starting Phase 3:

1. **`references/DESIGN_RULES_REFERENCE.md`** — Common rules that apply to BOTH fidelity modes (component-first approach, app shell, color system, routes, navigation, spacing, Gestalt principles, Figma Capture mode, file structure).
2. **`references/HIGH_FIDELITY_PROTOTYPE_REFERENCE.md`** — Additional rules specific to Hi-Fi mode (DS token colors, hover states, border radius, elevation, images, typography).
3. **`references/LOW_FIDELITY_WIREFRAME_REFERENCE.md`** — Additional rules specific to Lo-Fi mode (black/white only, crossbox placeholders, text as lines, no rounded corners, no hover states, no placeholders in inputs).
4. **`references/M3_COLOR_ROLES_REFERENCE.md`** — Complete M3 color role definitions, pairing rules, component-to-token mapping, and accessibility contrast requirements.

## Template Files

All tool-related templates go into `client/src/tools/`:

- `templates/AppShell.tsx` — App shell wrapper that composes ScreensSidebar and Toolbar. Handles fullscreen mode, keyboard shortcuts, help overlay, and container size measurement. Use this file directly — do NOT rewrite from scratch.
- `templates/ScreensSidebar.tsx` — Left sidebar with project logo, screen count badge, numbered navigation list with active state highlighting and auto-scroll. Use this file directly — do NOT rewrite from scratch. Only update the logo/project name.
- `templates/Toolbar.tsx` — Top toolbar with: screen name display, fidelity mode toggle (Lo-Fi / Hi-Fi), container size display, ColorPaletteTool (Hi-Fi only), Figma Capture Mode toggle, Full Screen button, Help button, and Prev/Next navigation. Use this file directly — do NOT rewrite from scratch.
- `templates/ColorPaletteTool.tsx` — Complete color palette tool with: manual hex editing per token, built-in and custom preset selection, save/update/rename/delete custom presets, export/import JSON, eyedropper tool, WCAG contrast checker with per-swatch warning indicators. Use this file directly — do NOT rewrite from scratch.
- `templates/screens.ts` — Screen definitions array (label + path pairs). Use this file directly — only update the entries to match the project's screens.

Context templates go into `client/src/contexts/`:

- `templates/FidelityModeContext.tsx` — Fidelity mode context provider (Lo-Fi / Hi-Fi, Figma Capture). Use this file directly — do NOT rewrite from scratch.
- `templates/DesignSystem.ts` — DS token object with live sync hook for real-time color updates. Use this file directly — do NOT rewrite from scratch.
- `templates/DesignSystemContext.tsx` — Full context provider with token state, CSS variable injection, localStorage persistence, preset management (built-in + custom), and the `useDesignSystem()` hook. Use this file directly — do NOT rewrite from scratch.
- `templates/dsPresets.ts` — Preset palettes array and DEFAULT_DS_COLORS reference. Update with the user's custom palette as the first entry. Keep the built-in presets below it.

Route template:

- `templates/routes.ts` — Route constants pattern. Use this file directly — do NOT rewrite from scratch. Only update the route entries to match the project's screens.

## File Structure

```
client/src/
  tools/                          ← App shell and toolbar tools (DO NOT modify styling)
    AppShell.tsx                   ← Shell wrapper (sidebar + toolbar + canvas)
    ScreensSidebar.tsx             ← Left sidebar with screen navigation
    Toolbar.tsx                    ← Top toolbar with fidelity toggle and tools
    ColorPaletteTool.tsx           ← M3 colour system editor with presets & WCAG checker
    screens.ts                    ← Screen definitions (label + path)
  contexts/                       ← React contexts
    DesignSystem.ts               ← DS token object & useDSSync hook
    DesignSystemContext.tsx        ← M3 colour state, presets, import/export
    dsPresets.ts                  ← Built-in colour presets & DEFAULT_DS_COLORS
    FidelityModeContext.tsx        ← Lo-Fi / Hi-Fi toggle & Figma Capture state
    ThemeContext.tsx               ← Light/dark theme provider
  components/                     ← Reusable UI components (one per file)
  screens/                        ← All screen components
  dialogs/                        ← Interactive dialog/overlay components
  icons/                          ← Icon component files
  photos/                         ← CDN photo URL mappings
  layout/                         ← Layout wrappers (e.g., SettingsLayout)
  hooks/                          ← Custom hooks
  lib/                            ← Utility helpers
  ui/                             ← shadcn/ui components
  App.tsx                         ← Routes & provider setup
  index.css                       ← Global styles & Tailwind design tokens
  main.tsx                        ← React entry point
  routes.ts                       ← Route constants
```
