import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
const setup = {
  state: {
    /** Current theme mode: 'light' or 'dark' */
    mode: localStorage.getItem("themeMode") || "light"
  },
  getters: {},
  actions: {
    /**
     * Toggle between light and dark mode
     */
    toggleMode: (_, store) => {
      const newMode = store.state.mode === "light" ? "dark" : "light";
      store.setMode(newMode);
    }
  },
  mutators: {
    /** Set a specific theme mode */
    setMode: (mode) => {
      localStorage.setItem("themeMode", mode);
      return { mode };
    }
  }
};
const themeSo = bn(setup);
export {
  themeSo as default
};
//# sourceMappingURL=theme-CNI2_l_i.js.map
