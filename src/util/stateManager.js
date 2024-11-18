const STATE_KEY = "accessibilityPluginState";

let state = {
  options: {
    fontSize: 16,
    textSpace: 2,
    lineSpace: 1.5,
    highContrast: false,
    invert: false,
    saturation: false,
    blackAndWhite: false,
    hideImage: false,
    focusIndicator: true,
    textToSpeech: false,
    font: false,
    alignment: false,
    linkHighlight: false,
    cursor: false,
    tooltip: false,
    animations: true,
  },
  originalStyles: new Map(),
};

const loadState = () => {
  const savedState = localStorage.getItem(STATE_KEY);
  if (savedState) {
    state = JSON.parse(savedState);
    state.originalStyles = new Map(state.originalStyles);
  }
};

const saveState = () => {
  const stateToSave = {
    ...state,
    originalStyles: Array.from(state.originalStyles.entries()), // Convert Map to Array for storage
  };
  localStorage.setItem(STATE_KEY, JSON.stringify(stateToSave));
};

const setOption = (key, value) => {
  state.options[key] = value;
  saveState();
};

const getOption = (key) => state.options[key];
const getOptions = () => state.options;
const getOriginalStyles = () => state.originalStyles;
const setOriginalStyles = (newStyles) => {
  state.originalStyles = newStyles;
  saveState();
};

export {
  loadState,
  saveState,
  setOption,
  getOption,
  getOptions,
  getOriginalStyles,
  setOriginalStyles,
};
