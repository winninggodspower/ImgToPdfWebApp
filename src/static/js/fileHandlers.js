// fileHandlers.js
let mergeBtn = document.getElementById('mergeBtn');

export function handleFiles(files) {
    console.log(files);

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
