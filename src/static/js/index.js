// index.js
import { Modal } from "flowbite";
import { preventDefaults, highlight, unhighlight, handleFileDrop, handleInputChange } from "./eventHandlers.js";
import { handleFileSubmit } from "./fileHandlers.js";
import Sortable from "sortablejs";

let formContainer = document.querySelector("form");
let inputField = document.querySelector("input[name='images']");
let previewArea = document.getElementById("previewArea");
let formSubmitBtn = formContainer.querySelector("input[type='submit']");
let mergeBtn = document.getElementById("mergeBtn");
const pdfModal = document.getElementById('pdf-modal');


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

// close modal
function closePdfModal(){
  new Modal(pdfModal).hide()
  document.querySelector("body > div[modal-backdrop]")?.remove()
} 


// sortable js, for drag and drop
new Sortable(previewArea, {
  ghostClass: "sortable-ghost", 
  animation: 150,
})


mergeBtn.addEventListener('click', ()=>{formSubmitBtn.click()})
