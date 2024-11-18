import {
  changeFontSize,
  changeTextSpacing,
  toggleTextAlignment,
  toggleFont,
  toggleLineSpacing,
} from "../modules/text.js";
import {
  toggleHighContrast,
  toggleInvertFilter,
  toggleSaturationFilter,
  toggleBlackAndWhiteFilter,
} from "../modules/filter.js";
import { toggleTextToSpeech } from "../modules/textToSpeech.js";
import { toggleCursorStyle } from "../modules/cursor.js";
import { toggleHighlightLinks } from "../modules/link.js";
import { toggleHideImage } from "../modules/hideImage.js";
import { toggleTooltips } from "../modules/tooltip.js";
import { handleKeyboardNavigation } from "../modules/keyboardNavigation.js";
import { toggleAnimations } from "../modules/stopAnimation.js";
import PageStructureAnalyzer from "../modules/pageStructure.js";

export function setupEventListeners() {
  const actions = {
    "a11y-increase-font": () => changeFontSize(2),
    "a11y-decrease-font": () => changeFontSize(-2),
    "a11y-increase-text-space": () => changeTextSpacing(2),
    "a11y-decrease-text-space": () => changeTextSpacing(-2),
    "a11y-line-space": () => toggleLineSpacing(),
    "a11y-high-contrast": () => toggleHighContrast(),
    "a11y-invert": () => toggleInvertFilter(),
    "a11y-saturation": () => toggleSaturationFilter(),
    "a11y-blackAndWhite": () => toggleBlackAndWhiteFilter(),
    "a11y-hide-image": () => toggleHideImage(),
    "a11y-text-alignment": () => toggleTextAlignment(),
    "a11y-text-to-speech": () => toggleTextToSpeech(),
    "a11y-toggle-font": () => toggleFont(),
    "a11y-link-highlight": () => toggleHighlightLinks(),
    "a11y-cursor": () => toggleCursorStyle(),
    "a11y-tooltip": () => toggleTooltips(),
    "a11y-animation": () => toggleAnimations(),
    "a11y-page-structure": () => PageStructureAnalyzer.init(),
  };

  Object.entries(actions).forEach(([id, action]) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", action);
    }
  });

  document.addEventListener("keydown", handleKeyboardNavigation);
}
