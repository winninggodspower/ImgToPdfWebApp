// dragAndDrop.js
export function updateDroppedFilesOrder() {
    let droppedFilesOrder = [];
    const previewItems = document.querySelectorAll('.previewItem');
    previewItems.forEach(item => {
        const img = item.querySelector('img');
        droppedFilesOrder.push(img.alt);
    });
    return droppedFilesOrder;
}