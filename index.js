import {
  loadState,
  saveState,
  setOption,
  getOption,
  setOriginalStyles,
  getOriginalStyles,
} from "./util/stateManager.js";
import { createControlPanel, injectedStyles } from "./util/controlPanel.js";
import { setupEventListeners } from "./util/eventListeners.js";
import { injectStyles } from "./util/styleInjector.js";
import { reset } from "./util/reset.js";

class AccessibilityPlugin {
  constructor(options = {}) {
    loadState();

    // Apply custom options provided on initialization
    this.options = { ...getOption(), ...options };
    this.originalStyles = getOriginalStyles();

    this.init();
  }

  init() {
    createControlPanel();
    setupEventListeners();
    injectStyles(injectedStyles);
  }

  reset() {
    setOriginalStyles(new Map());
    saveState();
  }
}

export default AccessibilityPlugin;
