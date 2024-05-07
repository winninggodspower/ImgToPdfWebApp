// index.js
import { preventDefaults, highlight, unhighlight, handleFileDrop, handleInputChange } from "./eventHandlers.js";
import { handleDragStart, handleDragOver, handleDrop} from "./dragAndDrop.js";
import { handleFileSubmit } from "./fileHandlers.js";

let formContainer = document.querySelector("form");
let inputField = document.querySelector("input[name='images']");
let previewArea = document.getElementById("previewArea");
let formSubmitBtn = formContainer.querySelector("input[type='submit']");
let mergeBtn = document.getElementById("mergeBtn");


// Event listeners for the form container
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

formContainer.addEventListener('submit', handleFileSubmit, false)

// Add event listener for file upload using input field
inputField.addEventListener('change', handleInputChange);


// Event listeners for the rearranging phots
// Add event listeners for drag and drop
previewArea.addEventListener('dragstart', handleDragStart, false);
previewArea.addEventListener('dragover', handleDragOver, false);
previewArea.addEventListener('drop', handleDrop, false);


mergeBtn.addEventListener('click', ()=>{formSubmitBtn.click()})
