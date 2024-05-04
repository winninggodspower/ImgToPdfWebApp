// index.js
import { Draggable, store } from "@dflex/draggable";
import { preventDefaults, highlight, unhighlight, handleFileDrop, handleInputChange } from "./eventHandlers.js";
import { handleDragStart, handleDragOver, handleDrop} from "./dragAndDrop.js";

let formContainer = document.querySelector("form");
let inputField = document.querySelector("input[name='images']");
let previewArea = document.getElementById("previewArea");
let mergeBtn = document.getElementById("mergeBtn");

// store.register({id: 'previewArea'})

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


// previewArea.addEventListener('mousedown', (e)=>{
//   if (e.button === 0) {
//     let dflexDnD = new Draggable(id, {x: e.clientX, y: e.clientY});
//   }
// }, false);

// previewArea.addEventListener('mousemove', (e)=>{
//   if (dflexDnD) {
//     dflexDnD.dragAt(e.clientX, e.clientY); 
//   }
// }, false);

// previewArea.addEventListener('drop', (e)=>{
//   if (dflexDnD) {
//     dflexDnD.endDragging();
//     dflexDnD = null;
//   }
// }, false);



// Add event listeners for long press
mergeBtn.addEventListener('click', ()=>{formContainer.submit()})
