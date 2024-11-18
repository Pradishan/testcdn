import { setOption, getOption } from "../util/stateManager.js";

function applyFilter(filterState, filter) {
  const controlPanel = document.getElementById("a11y-control-panel");
  const excludedElements = ["body", "html", "head"];

  const allElements = document.querySelectorAll("*");
  allElements.forEach((element) => {
    if (
      !excludedElements.includes(element.tagName.toLowerCase()) &&
      !controlPanel.contains(element)
    ) {
      element.style.filter = filterState ? filter : "none";
    }
  });
}

// Toggle High Contrast filter and update state
export function toggleHighContrast() {
  const currentState = getOption("highContrast") || false;
  setOption("highContrast", !currentState); // Toggle high contrast
  applyFilter(!currentState, "contrast(500%) brightness(90%)"); // Apply or remove the filter
}

// Toggle Invert filter and update state
export function toggleInvertFilter() {
  const currentState = getOption("invert") || false;
  setOption("invert", !currentState); // Toggle invert filter
  applyFilter(!currentState, "invert(100%)"); // Apply or remove the filter
}

// Toggle Saturation filter and update state
export function toggleSaturationFilter() {
  const currentState = getOption("saturation") || false;
  setOption("saturation", !currentState); // Toggle saturation filter
  applyFilter(!currentState, "saturate(500%)"); // Apply or remove the filter
}

// Toggle Black and White filter and update state
export function toggleBlackAndWhiteFilter() {
  const currentState = getOption("blackAndWhite") || false;
  setOption("blackAndWhite", !currentState); // Toggle black and white filter
  applyFilter(!currentState, "grayscale(100%)"); // Apply or remove the filter
}
