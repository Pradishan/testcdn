import {
  setOption,
  getOption,
  setOriginalStyles,
  getOriginalStyles,
  saveState,
} from "../util/stateManager.js";

// Function to select all elements with animations or transitions, excluding the control panel
function getElementsWithAnimationsOrTransitions() {
  const allElements = document.querySelectorAll("*");
  const controlPanel = document.getElementById("a11y-control-panel");
  const animatedElements = [];

  allElements.forEach((element) => {
    // Exclude control panel and its children
    let currentElement = element;
    let isExcluded = false;
    while (currentElement) {
      if (currentElement === controlPanel) {
        isExcluded = true;
        break;
      }
      currentElement = currentElement.parentElement;
    }
    if (isExcluded) return;

    // Check for animations or transitions
    const computedStyle = window.getComputedStyle(element);
    const hasAnimation = computedStyle.animationName !== "none";
    const hasTransition = 
      computedStyle.transitionProperty !== "all" && 
      computedStyle.transitionProperty !== "none";

    if (hasAnimation || hasTransition) {
      animatedElements.push(element);
    }
  });

  return animatedElements;
}

export function toggleAnimations() {
  // Get the current state of animations
  const animationsEnabled = getOption("animations");
  
  // Toggle the animations state
  setOption("animations", !animationsEnabled);
  
  // Get or initialize the stored styles
  let originalStyles = getOriginalStyles();

  // Select all elements with animations and transitions
  const elementsWithAnimationOrTransition = getElementsWithAnimationsOrTransitions();

  if (animationsEnabled) {
    // Disable animations and store original values
    elementsWithAnimationOrTransition.forEach((element) => {
      const computedStyle = window.getComputedStyle(element);
      
      // Store styles for this element
      if (!originalStyles.hasOwnProperty('animations')) {
        originalStyles.animations = {
          elements: []
        };
      }

      // Check if element styles are already stored
      const existingElementIndex = originalStyles.animations.elements.findIndex(
        item => item.element === element
      );

      if (existingElementIndex === -1) {
        // Store new element styles
        originalStyles.animations.elements.push({
          element: element,
          styles: {
            animation: computedStyle.animation,
            transition: computedStyle.transition
          }
        });
      }

      // Disable animations
      element.style.animation = "none";
      element.style.transition = "none";
    });
  } else {
    // Re-enable animations using stored values
    if (originalStyles.animations && originalStyles.animations.elements) {
      originalStyles.animations.elements.forEach(item => {
        if (item.element && item.styles) {
          item.element.style.animation = item.styles.animation;
          item.element.style.transition = item.styles.transition;
        }
      });
    }
  }

  // Update stored styles
  setOriginalStyles(originalStyles);
  
  // Save the state
  saveState();
}