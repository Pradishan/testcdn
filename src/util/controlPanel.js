import { populateVoiceAndLanguageOptions } from "../modules/textToSpeech.js";

export function createControlPanel() {
  const panel = document.createElement("div");
  panel.id = "a11y-control-panel";
  panel.innerHTML = `
        <div class="a11y-panel">
            <div class="col">
                <button id="a11y-increase-font">A+</button>
                <button id="a11y-decrease-font">A-</button>
                <button id="a11y-increase-text-space">T+</button>
                <button id="a11y-decrease-text-space">T-</button>
                <button id="a11y-line-space">Line Space</button>
                <button id="a11y-high-contrast">High Contrast</button>
                <button id="a11y-invert">Invert</button>
                <button id="a11y-saturation">Saturation</button>
                <button id="a11y-blackAndWhite">Black And White</button>
                <button id="a11y-hide-image">Hide Image</button>
                <button id="a11y-text-alignment">Alignment</button>
                <button id="a11y-toggle-font">Font</button>
                <button id="a11y-link-highlight">Link Highlight</button>
                <button id="a11y-cursor">Cursor</button>
                <button id="a11y-tooltip">Tooltip</button>
                <button id="a11y-animation">Stop Animation</button>
                <button id="a11y-page-structure">Page Structure</button>
            </div>
            <div class="col">
                <div>
                    <label for="languageSelect">Select Language</label>
                    <select id="languageSelect"></select>
                </div>
                <div>
                    <label for="voiceSelect">Select Voice</label>
                    <select id="voiceSelect"></select>
                </div>
                <button id="a11y-text-to-speech">Read Aloud</button>
            </div>
        </div>
    `;
  document.body.appendChild(panel);
  window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceAndLanguageOptions();
  };
}

export const injectedStyles = `
    #a11y-control-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99999;
        background-color: #f7f9fc;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 320px;
        font-family: Arial, sans-serif;
        filter: none;
    }

    .a11y-panel {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .a11y-panel .col {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .a11y-panel button {
        background-color: #4a90e2;
        color: #ffffff;
        border: none;
        padding: 8px 12px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .a11y-panel button:hover {
        background-color: #357ab7;
    }

    .a11y-panel button:active {
        background-color: #2d6599;
    }

    .a11y-panel select {
        width: 100%;
        padding: 8px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #ced4da;
        background-color: #ffffff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        color: #495057;
    }

    .a11y-panel label {
        font-size: 14px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }

    .a11y-panel .col div {
        margin-bottom: 10px;
    }

    /* Responsive styles */
    @media (max-width: 400px) {
        #a11y-control-panel {
            bottom: 10px;
            right: 10px;
            padding: 15px;
        }
        .a11y-panel button {
            flex: 1 1 48%;
        }
    }
    
`;
