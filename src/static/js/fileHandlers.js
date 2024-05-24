// fileHandlers.js
let mergeBtn = document.getElementById('mergeBtn');
import { Modal } from "flowbite";
import { Alert } from "./alert";
import { updateDroppedFilesOrder } from "./dragAndDrop";

export function handleFiles(files) {
    // make merge submit button visible
    mergeBtn.classList.remove('invisible');

    // Filter out non-image files
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();

    if (imageFiles.length > 0) {
        // Clear previous previews
        previewArea.innerHTML = '';

        // Display previews for each image file
        imageFiles.forEach(file => {
            const reader = new FileReader();
            dataTransfer.items.add(file);
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                img.classList.add('h-full', 'mx-auto');
                addPreviewImage(img)
            };
            reader.readAsDataURL(file);
        });


        // Update the file input with the dropped image files
        const fileInput = document.getElementById('images');
        fileInput.files = dataTransfer.files;

    } else {
        alert('Please drop only image files.');
    }
}

export function addPreviewImage(img) {
    const previewItem = document.createElement('div');
    previewItem.classList.add('previewItem', 'rounded-xl', 'mb-2', 'h-[80px]', 'w-[400px]', 'max-w-full', 'border-blue-300', 'border-2', 'bg-gray-100', 'bg-opacity-50', 'p-2', 'hover:shadow-md', 'cursor-pointer');
    previewItem.appendChild(img);
    previewItem.setAttribute('draggable', 'true'); // Make the preview item draggable
    
    previewArea.style.display = "flex"
    previewArea.appendChild(previewItem);
}

export function handleFileSubmit(e) {
    // Prevent default form submission
    e.preventDefault();

    let fileDropForm = e.target;
    // Add dropped files order to form data
    const formData = new FormData(fileDropForm);
    let droppedFilesOrder = updateDroppedFilesOrder()
    formData.append('droppedFilesOrder', JSON.stringify(droppedFilesOrder));

    // Submit form with updated form data
    fetch(fileDropForm.action, {
        method: fileDropForm.method,
        body: formData
    })
    .then(response => {
        if (response.ok && response.status === 200) {
            return response.blob();
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.message);
            })
        }
    })
    .then(pdfData =>{
        // Create a new blob instance
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        // Create a URL for the blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        const pdfModal = document.getElementById('pdf-modal');
        const pdfIframe = document.getElementById('pdf-iframe');
        pdfIframe.src = pdfUrl;

        //set download link
        pdfModal.querySelector('a').href = pdfUrl;

        let modal = new Modal(pdfModal);
        modal.show();

        pdfModal.querySelector('[data-modal-hide').onclick = ()=>{
            modal.hide();
        }
    })
    .catch(error => {
        console.log(error);
        Alert(error.message, 'error');
    });

};
