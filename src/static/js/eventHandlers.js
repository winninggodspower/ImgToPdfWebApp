// eventHandlers.js
import { handleFiles } from "./fileHandlers.js";

let formContainer = document.querySelector("form");

export function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

export function highlight(e) {
  formContainer.classList.add("bg-blue-200");
}

export function unhighlight(e) {
  formContainer.classList.remove("bg-blue-200");
}

export function handleFileDrop(e) {
  e.preventDefault();
  let files = e.dataTransfer.files;
  handleFiles(files);
}

export function handleInputChange(e) {
  let files = e.target.files;
  handleFiles(files);
}
