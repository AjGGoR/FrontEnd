# Copilot Instructions for AI Agents

## Project Overview
- This is a React + TypeScript + Vite project for a weather dashboard.
- State management uses Redux Toolkit (see `src/store/`).
- Weather data is fetched via OpenWeather API (see `src/api/openWeather.ts`).
- UI is styled with Tailwind CSS (see `tailwind.config.js`, `postcss.config.js`).

## Key Architecture & Patterns
- **Pages**: Route-level components in `src/pages/` (`Home.tsx`, `CityDetail.tsx`, `Favorites.tsx`).
- **Components**: Reusable UI in `src/components/` (e.g., `CityCard.tsx`, `ForecastStrip.tsx`).
- **State Slices**: Redux slices in `src/store/` (`weatherSlice.ts`, `favoritesSlice.ts`, `settingsSlice.ts`).
- **Constants**: Shared data in `src/constants/` (e.g., `cities.ts`).
- **Utilities**: Helper functions in `src/utils/` (e.g., `units.ts`).
- **Types**: Shared TypeScript types in `src/types/` (e.g., `weather.ts`).

## Developer Workflows
- **Start dev server**: `npm run dev` (Vite, HMR enabled)
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint**: `npm run lint` (uses ESLint, see `eslint.config.js`)
- **Type check**: `npx tsc --noEmit`

## Project-Specific Conventions
- Use Redux Toolkit for all global state; avoid React Context for app-wide state.
- Weather data is always normalized in the Redux store.
- Favor functional components and hooks (see `src/store/hooks.ts`).
- Use Tailwind utility classes for styling; avoid custom CSS unless necessary.
- All API calls go through `src/api/openWeather.ts`.
- City and unit selection logic is centralized in Redux slices.
- Persisted state (favorites, settings) handled in `src/store/persist.ts`.

## Integration & External Dependencies
- OpenWeather API: All requests and response shaping handled in `src/api/openWeather.ts`.
- No backend server; all data is fetched client-side.
- Vite plugins: see `vite.config.ts` for configuration.

## Examples
- To add a new weather metric, update `src/types/weather.ts`, `src/store/weatherSlice.ts`, and relevant UI in `src/components/MetricGrid.tsx`.
- To add a new city, update `src/constants/cities.ts`.

## References
- [src/store/weatherSlice.ts](../src/store/weatherSlice.ts)
- [src/api/openWeather.ts](../src/api/openWeather.ts)
- [src/components/](../src/components/)
- [src/pages/](../src/pages/)

---
For more, see [README.md](../README.md) and in-file comments.
