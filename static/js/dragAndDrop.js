// dragAndDrop.js

export function handleDragStart(e) {
    e.target.classList.add('dragging');
}

export function handleDragOver(e) {
    e.preventDefault();
}

let longPressTimer; // Timer to track long press
let isDragging = false; // Flag to track if dragging has started

export function handleDrop(e) {
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

export function handleTouchMove(e) {
    if (isDragging) {
        handleDrop(e);
    }
}

export function handleLongPressStart(e) {
    longPressTimer = setTimeout(() => {
        handleDragStart(e);
    }, 500); // Adjust the delay for long press as needed (in milliseconds)
}

export function handleLongPressEnd() {
    clearTimeout(longPressTimer);
}
