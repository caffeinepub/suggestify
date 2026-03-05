# Suggestify

## Current State
- Full campus feedback management frontend with Login, Dashboard, Submit Complaint, Complaint Detail, and Admin pages.
- AppHeader with navigation, user dropdown, and a disabled "Settings" menu item.
- index.css has OKLCH design tokens for light mode only — no dark mode variables, no theme switching.
- AppContext manages auth + complaints state. No appearance state exists.

## Requested Changes (Diff)

### Add
- `ThemeContext` — global context storing: `theme` (light | dark), `accentColor` (indigo | emerald | rose | amber), `fontSize` (sm | md | lg). Persists to `localStorage`.
- Dark mode CSS variables in `index.css` (`.dark` class on `<html>`).
- Accent color CSS variable overrides for each palette option.
- Font size CSS class overrides (`font-size-sm`, `font-size-md`, `font-size-lg`) applied to `<html>`.
- `AppearancePage` — a dedicated `/appearance` route with three controls:
  - Dark / Light mode toggle (Switch)
  - Accent color picker (4 swatches: Indigo, Emerald, Rose, Amber)
  - Font size selector (Small / Medium / Large radio group)
- A live preview card on the AppearancePage showing how the current theme looks.

### Modify
- `index.css` — add `.dark` selector with dark mode token overrides; add accent color CSS variable overrides per class; add font-size body overrides.
- `AppHeader` — enable the "Settings" dropdown item to navigate to `/appearance` (remove `disabled` prop).
- `App.tsx` — add `/appearance` route wrapped in `RequireAuth`; wrap entire app in `ThemeProvider`.
- `AppContext` or new `ThemeContext` file — introduce appearance state.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/context/ThemeContext.tsx` with `ThemeProvider` and `useTheme` hook. Reads/writes localStorage. Applies `dark` class and accent/font-size classes to `document.documentElement`.
2. Update `index.css`:
   - Add `.dark` block with dark variants of all OKLCH tokens.
   - Add `.accent-emerald`, `.accent-rose`, `.accent-amber` blocks overriding `--primary`, `--ring`, `--chart-1`.
   - Add `.font-size-sm`, `.font-size-md`, `.font-size-lg` blocks setting `font-size` on `html`.
3. Create `src/pages/AppearancePage.tsx` with Switch (dark mode), color swatches (accent), and RadioGroup (font size), plus a live preview card.
4. Update `App.tsx` to wrap `AppProvider` with `ThemeProvider` and register the `/appearance` route.
5. Update `AppHeader.tsx` to enable the Settings item and navigate to `/appearance`.
