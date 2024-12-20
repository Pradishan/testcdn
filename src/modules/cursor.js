import { setOption, getOption } from "../util/stateManager.js";
import { injectStyles } from "../util/styleInjector.js";
import { svgToBase64 } from "../util/svg.js";

export function toggleCursorStyle() {
  const cursorModes = [
    "large-cursor",
    "reading-mask",
    "reading-guide",
    "default-cursor",
    "reading-pointer",
  ];

  const currentMode = getOption("cursorStyle") || "default-cursor";
  const currentModeIndex = cursorModes.indexOf(currentMode);
  const nextModeIndex = (currentModeIndex + 1) % cursorModes.length;
  const nextMode = cursorModes[nextModeIndex];

  document.body.classList.remove(currentMode);

  setOption("cursorStyle", nextMode);

  document.body.classList.add(nextMode);
}

// SVG string for large cursor
const svgString = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.09 122.88" style="enable-background:new 0 0 96.09 122.88" xml:space="preserve"><g><path d="M61.61,122.31c-1.34,0.62-2.82,0.72-4.15,0.37c-1.46-0.39-2.75-1.31-3.55-2.67L39.03,94.36l-14.15,15.88 c-1.97,2.21-4.21,3.88-6.37,4.75c-1.66,0.67-3.31,0.88-4.84,0.56c-1.69-0.36-3.14-1.33-4.2-3.01c-0.84-1.33-1.4-3.11-1.57-5.39 L0.01,4.41C0,4.33,0,4.25,0,4.18c-0.01-0.64,0.11-1.27,0.37-1.84c0.29-0.66,0.76-1.26,1.37-1.7C2,0.44,2.28,0.31,2.58,0.23 c0.59-0.2,1.2-0.27,1.79-0.2C4.94,0.09,5.5,0.26,6.01,0.55C6.18,0.63,6.35,0.73,6.5,0.85l84.88,58.11 c1.88,1.29,3.14,2.66,3.88,4.05c0.93,1.75,1.04,3.49,0.5,5.14c-0.48,1.49-1.5,2.81-2.9,3.91c-1.82,1.43-4.39,2.54-7.3,3.14 c-0.03,0.01-0.07,0.01-0.1,0.02l-20.73,4.29l14.77,25.73c0.78,1.36,0.93,2.94,0.54,4.39c-0.38,1.41-1.27,2.71-2.59,3.56 c-0.05,0.04-0.11,0.07-0.17,0.1l-15.34,8.86C61.84,122.21,61.73,122.26,61.61,122.31L61.61,122.31z M58.84,117.48 c0.15,0.04,0.3,0.04,0.44-0.01c0.05-0.03,0.1-0.06,0.16-0.08l15.14-8.74c0.14-0.1,0.23-0.25,0.28-0.41 c0.03-0.13,0.03-0.25-0.01-0.33L58.23,78.97l0.01,0c-0.14-0.24-0.24-0.51-0.3-0.8c-0.3-1.45,0.64-2.87,2.09-3.17l24.36-5.04 c0.03-0.01,0.06-0.02,0.1-0.02c2.1-0.44,3.88-1.18,5.07-2.11c0.58-0.46,0.97-0.91,1.11-1.35c0.09-0.27,0.05-0.6-0.15-0.97 c-0.34-0.64-1.03-1.34-2.15-2.11L5.58,6.74l7.69,100.02c0.1,1.36,0.37,2.32,0.75,2.92c0.22,0.35,0.49,0.55,0.77,0.61 c0.45,0.1,1.04-0.01,1.72-0.28c1.39-0.56,2.92-1.73,4.35-3.34l16.62-18.65l0,0c0.19-0.21,0.41-0.39,0.66-0.54 c1.28-0.74,2.93-0.31,3.67,0.98l16.75,28.85C58.62,117.39,58.71,117.45,58.84,117.48L58.84,117.48z M59.43,117.39 c0.35-0.17,0.75-0.27,1.17-0.27L59.43,117.39L59.43,117.39z"/></g></svg>`;
const line = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.52 23.69">
  <defs><style>.cls-1{fill-rule:evenodd;}</style></defs>
  <title>horizontal-line</title>
  <path class="cls-1" d="M1.51,0H488.49a1.52,1.52,0,0,1,1.51,1.51V22.18a1.52,1.52,0,0,1-1.51,1.51H1.51A1.52,1.52,0,0,1,0,22.18V1.51A1.52,1.52,0,0,1,1.51,0Z"/>
</svg>
`;

// Base64-encoded SVG for large cursor
const largeCursorSVG = svgToBase64(svgString);
const largeCursorline = svgToBase64(line);

const injectedStyles = `
    /* Cursor Styles */
    body.large-cursor {
        cursor: url('${largeCursorSVG}') 0 0, auto; 
    }

    body.default-cursor {
        cursor: default; 
    }

    body.reading-mask {
        cursor: crosshair; 
    }

    body.reading-guide {
       cursor: url('${largeCursorline}') 0 0, auto; 
    }

    body.reading-pointer {
        cursor: pointer; 
    }
`;

injectStyles(injectedStyles);
