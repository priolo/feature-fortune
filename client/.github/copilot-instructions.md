# Copilot Instructions
- **Core Stack** React 19 on Vite 7 + MUI 7; entry `src/main.tsx` loads `App` and i18n; router base `/app`.
- **Routing** `src/App.tsx` defines `BrowserRouter` anchored at `/app`; nested routes under `Layout`; new routes must register here and update `LOCATION_PAGE`.
- **Layout** `layout/Layout.tsx` wraps header + `Outlet`; `layout/Framework.tsx` centers cards; replicate when building new screens.
- **State Engine** Stores live in `src/stores/**` using `@priolo/jon` `createStore({state,getters,actions,mutators})`; export `somethingSo` and typed interface; subscribe with `const somethingSa = useStore(somethingSo)`.
- **Store Lifecycle** Keep state mutations inside `mutators` returning partial state; actions receive payload and optional store; call `store.mutatorName()` to update; reuse `store._update()` only when needed (see `dialogStore`).
- **Naming** Convention is `So` suffix for store object, `Sa` for the hooked instance, and `setup` constant shaping state; follow this to avoid confusion.
- **Data Fetching** Use `src/api/*.ts` modules as the only boundary to the backend; each module wraps `plugins/AjaxService`, strips fields before sending, and returns typed payloads.
- **AjaxService** Centralizes fetch; base URL from `import.meta.env.VITE_API_URL` or `/api/`; errors auto-log via `stores/log`; respect `CallOptions` flags (`isLogin`, `noError`, `manageAbort`).
- **Messages** `layout/MsgBox.tsx` displays `dialogSo` state as Snackbar/Dialog; to show toast call `dialogSo.dialogOpen({ text, modal: false })` or use `logSo.add`.
- **Location Tracking** Components set `locationSo.setCurrent(LOCATION_PAGE.*)` on mount so the header can swap via `layout/HeaderCmp`.
- **Feature Domain** `stores/feature/list.ts` holds fetched features; filtering/sorting logic in `stores/feature/utils.ts`; extend here before touching UI.
- **Detail Flow** `FeatureDetailPag` seeds store with `buildNewFeature()` for `/feature/new`; fetching uses `featureDetailSo.fetch()` which populates nested cards; ensure new fields are mirrored in the `Feature` type, detail store, and cards.
- **Query Params** List views keep filters in `useSearchParams`; mutate maps via `Object.fromEntries`; delete keys for null values to avoid stale params.
- **Auth Store** `stores/auth/repo.ts` manages login, GitHub/Google linking, Stripe setup; async actions often redirect; new auth flows should reuse `setUser`.
- **Stripe Integration** `stripePromise` expects `VITE_STRIPE_PUBLISHABLE_KEY`; check `components/stripe/**` when wiring payments.
- **GitHub Helpers** Metadata selectors live under `components/github/**`; they expect store-managed state and call back with `GitHubRepository` or `GitHubUser` payloads.
- **Env Secrets** Create `.env.local` with `VITE_` keys (API URL, OAuth IDs, Stripe key) before running `npm run dev`; Vite reads them via `import.meta.env`.
- **i18n** `plugins/i18n.ts` loads `locales/en.json`; add strings there and consume them with `useTranslation()` instead of hard-coded literals.
- **Styling** Prefer MUI `sx` props; shared card layout under `components/Card.tsx`; follow existing gap-based spacing and typography scale.
- **Build & Run** Install deps with `npm install`; use `npm run dev` (Vite dev server with proxy to `http://localhost:3000/api`); production build runs `tsc -b && vite build`.
- **Module Federation** `vite.config.ts` already registers `@originjs/vite-plugin-federation`; keep new shared deps inside `shared: []` to avoid duplicate React copies.
- **Type Paths** Import source files via `@/` alias from `tsconfig.json`; keep `.ts/.tsx` extensions when the file exports types only.
- **Testing Gap** No automated tests yet; document manual verification steps when touching critical flows.
- **Creating New Store** Mirror `stores/funding/list.ts`: define `setup`, export the `So`, and re-export typed interfaces for consumers.
- **Error Handling** Prefer raising dialogs/log entries over inline alerts; `AjaxService` already converts HTTP failures into log entries with codes like `http:error:fetch`.
- **Performance** Keep `useStore()` calls shallow; heavy derivations belong in `useMemo` as done in `FeatureListPag`.
- **Navigation** Use `useNavigate()` and route strings prefixed with `/app` to match router base and deployment base path.
- **Cleanup** Clear long-lived stores on unmount (see `FeatureDetailPag` cleanup) to keep state isolated between navigations.
- **Contributing Flow** After edits run `npm run build` to catch TS issues; project disables strict mode so compile-time checks happen only on build.
- **Reference Files** Start with `src/App.tsx`, `layout/HeaderCmp.tsx`, `stores/feature/list.ts`, and `plugins/AjaxService.ts` to understand interactions.


# GENERAL CONVENTION FOR DEFINING A REACT COMPONENT:

- it's always a function
- the STORES session with the comment: // STORES
after which all store definitions are inserted (with store, you can implement business logic outside the React component)
- the session HOOKS with the comment: // HOOKS
- the session HANDLER with the comment: // HANDLERS
- the RENDER session after the comment // RENDER
This session contains the definitions of the constants used in rendering and returned with React rendering.
- the SxProps style, if not small, is defined externally and after the function.