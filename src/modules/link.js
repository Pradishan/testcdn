import { setOption, getOption } from "../util/stateManager.js";
import { injectStyles } from "../util/styleInjector.js";

export function toggleHighlightLinks() {
  const highlightLinksEnabled = getOption("highlightLinks") || false;

  setOption("highlightLinks", !highlightLinksEnabled);

  const links = document.querySelectorAll("a, area");

  links.forEach((link) => {
    link.classList.toggle("highlight", !highlightLinksEnabled);
  });
}

const injectedStyles = `
  .highlight {
    background-color: yellow;
    color: red; 
  }
`;

injectStyles(injectedStyles);