import { setOption, getOption } from "../util/stateManager.js";
import { injectStyles } from "../util/styleInjector.js";

let voices = [];

function loadVoices() {
  return new Promise((resolve) => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve();
      };
    }
  });
}

export async function populateVoiceAndLanguageOptions() {
  await loadVoices();

  const languageSelect = document.getElementById("languageSelect");

  const languages = new Set(voices.map((voice) => voice.lang));

  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = lang;

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
      languageSelect.appendChild(option);
    } else {
      console.error("Target element not found for appending content.");
    }
  });

  languageSelect.addEventListener("change", updateVoiceOptions);
  updateVoiceOptions();
}

export function updateVoiceOptions() {
  const selectedLanguage = document.getElementById("languageSelect").value;
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = ""; // Clear existing options

  voices
    .filter((voice) => voice.lang === selectedLanguage)
    .forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
}

export function toggleTextToSpeech() {
  const textToSpeechEnabled = getOption("textToSpeech") || false;

  setOption("textToSpeech", !textToSpeechEnabled);

  if (!textToSpeechEnabled) {
    const selectedText = window.getSelection().toString();
    const selectedVoiceName = document.getElementById("voiceSelect").value;
    const selectedLanguage = document.getElementById("languageSelect").value;

    if (selectedText) {
      const utterance = new SpeechSynthesisUtterance(selectedText);
      utterance.lang = selectedLanguage;
      utterance.voice = speechSynthesis
        .getVoices()
        .find((voice) => voice.name === selectedVoiceName);

      utterance.onend = () => {
        setOption("textToSpeech", false);
      };

      window.speechSynthesis.speak(utterance);
    }
  } else {
    window.speechSynthesis.cancel();
  }
}

// window.speechSynthesis.onvoiceschanged = () => {
//   populateVoiceAndLanguageOptions();
// };

const injectedStyles = `
/* Language and Voice Dropdown Container */
.a11y-panel .col > div {
  width: 100%;
}

.a11y-panel .col > div label {
  display: block;
  margin-bottom: 5px;
}

.a11y-panel .col > div select {
  width: calc(100% - 10px);
}

#languageSelect, #voiceSelect {
  width: 100%;
}
`;

injectStyles(injectedStyles);
