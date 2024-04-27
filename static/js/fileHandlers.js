// fileHandlers.js
import { handleLongPressStart, handleLongPressEnd } from "./dragAndDrop.js";

export function handleFiles(files) {
    console.log(files);

    // Filter out non-image files
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (imageFiles.length > 0) {
        // Clear previous previews
        previewArea.innerHTML = '';

        // Display previews for each image file
        imageFiles.forEach(file => {
            const reader = new FileReader();
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
        fileInput.files = new FileList(imageFiles);
    } else {
        alert('Please drop only image files.');
    }
}

export function addPreviewImage(img) {
  const previewItem = document.createElement('div');
  previewItem.classList.add('previewItem', 'rounded-xl', 'mb-2', 'h-[80px]', 'w-[400px]', 'max-w-full', 'border-blue-300', 'border-2', 'bg-gray-100', 'bg-opacity-50', 'p-2', 'hover:shadow-md', 'cursor-pointer');
  previewItem.appendChild(img);
  previewItem.setAttribute('draggable', 'true'); // Make the preview item draggable

  // Add touch event listeners for long press
  previewItem.addEventListener('touchstart', handleLongPressStart, false);
  previewItem.addEventListener('touchend', handleLongPressEnd, false);

  previewArea.style.display = "flex"
  previewArea.appendChild(previewItem);
}
