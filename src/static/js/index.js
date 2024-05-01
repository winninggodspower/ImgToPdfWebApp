// index.js
import { preventDefaults, highlight, unhighlight, handleFileDrop, handleInputChange } from "./eventHandlers.js";
import { handleDragStart, handleDragOver, handleDrop, handleTouchMove, handleLongPressStart, handleLongPressEnd } from "./dragAndDrop.js";

let formContainer = document.querySelector("form");
let inputField = document.querySelector("input[name='images']");
let previewArea = document.getElementById("previewArea");
let mergeBtn = document.getElementById("mergeBtn");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  formContainer.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
  formContainer.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  formContainer.addEventListener(eventName, unhighlight, false);
});

// Add event listener for file drop
formContainer.addEventListener('drop', handleFileDrop, false);

// Add event listener for file upload using input field
inputField.addEventListener('change', handleInputChange);

// Add event listeners for drag and drop
previewArea.addEventListener('dragstart', handleDragStart, false);
previewArea.addEventListener('dragover', handleDragOver, false);
previewArea.addEventListener('drop', handleDrop, false);

// Add event listeners for long press
mergeBtn.addEventListener('click', ()=>{formContainer.submit()})
