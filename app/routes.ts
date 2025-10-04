import { relative } from "@react-router/dev/routes";

// Resolve routes relative to the project root. We point to the existing SPA entry
// in `src/App.tsx`. Adjust paths if you use a different layout.
const r = relative("./src");

export default [
  r.index("App.tsx"),
];
