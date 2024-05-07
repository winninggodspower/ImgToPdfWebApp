// dragAndDrop.js

export function handleDragStart(e) {
    e.target.classList.add('dragging');
}

export function handleDragOver(e) {
    e.preventDefault();
}


export function handleDrop(e) {
    e.preventDefault();
    // Reorder the preview items
    const draggedItem = document.querySelector('.dragging');
    if (draggedItem && draggedItem.classList.contains('previewItem')) {
        const dropIndex = Array.from(previewArea.children).indexOf(e.target);
        previewArea.insertBefore(draggedItem, previewArea.children[dropIndex]);
        draggedItem.classList.remove('dragging');
    }

}


export function updateDroppedFilesOrder() {
    let droppedFilesOrder = [];
    const previewItems = document.querySelectorAll('.previewItem');
    previewItems.forEach(item => {
        const img = item.querySelector('img');
        droppedFilesOrder.push(img.alt);
    });
    return droppedFilesOrder;
}