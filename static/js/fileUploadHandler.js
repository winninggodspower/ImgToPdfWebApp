let formContainer = document.querySelector("form");
let fileInput = document.querySelector("input[name='images']");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  formContainer.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  formContainer.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  formContainer.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  formContainer.classList.add("bg-blue-200");
}

function unhighlight(e) {
  formContainer.classList.remove("bg-blue-200");
}


// Add event listener for file drop
formContainer.addEventListener('drop', handleFileDrop, false);

// Add event listener for file upload using input field
fileInput.addEventListener('change', handleInputChange);

function handleFileDrop(e) {
  e.preventDefault();
  let files = e.dataTransfer.files;
  handleFiles(files);
}

function handleInputChange(e) {
  let files = e.target.files;
  handleFiles(files);
}

function handleFiles(files) {
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
        fileInput.files = FileList.from(imageFiles);
    } else {
        alert('Please drop only image files.');
    }
}

function addPreviewImage(img) {
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

// Add event listeners for drag and drop
previewArea.addEventListener('dragstart', handleDragStart, false);
previewArea.addEventListener('dragover', handleDragOver, false);
previewArea.addEventListener('drop', handleDrop, false);

// Add touch event listeners for touch-based drag and drop on mobile devices
previewArea.addEventListener('touchstart', handleTouchStart, false);
previewArea.addEventListener('touchmove', handleTouchMove, false);

let longPressTimer; // Timer to track long press
let isDragging = false; // Flag to track if dragging has started

function handleDragStart(e) {
  e.target.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  // Reorder the preview items
  const draggedItem = document.querySelector('.dragging');
  if (draggedItem && draggedItem.classList.contains('previewItem')) {
      const dropIndex = Array.from(previewArea.children).indexOf(e.target);
      previewArea.insertBefore(draggedItem, previewArea.children[dropIndex]);
      draggedItem.classList.remove('dragging');
  }

  isDragging = false; // Reset dragging flag
}

function handleTouchStart(e) {
    const touch = e.touches[0];
    const target = touch.target;
    if (target.classList.contains('rounded-xl')) {
        handleDragStart(e);
    }
}

function handleTouchMove(e) {
    if (isDragging) {
        handleDrop(e);
    }
}


function handleLongPressStart(e) {
  longPressTimer = setTimeout(() => {
      handleDragStart(e);
  }, 500); // Adjust the delay for long press as needed (in milliseconds)
}

function handleLongPressEnd() {
  clearTimeout(longPressTimer); 
}