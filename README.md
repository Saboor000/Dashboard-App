# Next.js Dashboard (Frontend Only)

Frontend-only dashboard built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**-style components. Data is fetched from a **static JSON dummy API** and refreshed on an interval to simulate real-time updates.

## Implementation approach

- **Dummy API**: `public/data.json` is fetched from the browser (`/data.json?t=<timestamp>`) to avoid caching.
- **Real-time updates**: polling every **5 seconds** via `setInterval` in `src/hooks/use-dashboard-data.js` (with `AbortController` cleanup).
- **Filtering**: multi-select filters + search in `src/components/dashboard/dashboard-client.jsx`; computed with `useMemo` and handlers stabilized with `useCallback`.
- **Charts**: Recharts components (tooltips, legends, animations) rendering pre-aggregated data.
- **Table**: `react-window` virtualized table for large datasets; responsive layout via horizontal scrolling + improved pagination controls.
- **Error handling**: loading/error/empty fallback UI components under `src/components/dashboard/`.

## Assumptions

- Static JSON is acceptable as the dummy API (no backend required).
- Polling every 5 seconds is sufficient for “real-time” simulation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test locally (production)

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push the project to GitHub.
2. Import it in Vercel.
3. Use defaults:
   - Build command: `next build`
   - Output: `.next`
4. Deploy (no environment variables required).

