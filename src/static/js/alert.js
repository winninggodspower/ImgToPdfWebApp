
let alertColors = {
    'success': 'alert-success',
    'info': 'alert-info',
    'warning': 'alert-warning',
    'error': 'alert-error',
}

function generateAlertId() {
    return 'alert-' + Date.now();
}

export function Alert(message, type) {
    const alertId = generateAlertId();

    let alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.classList.add('flex', 'items-center', 'p-4', 'mb-4', 'rounded-lg', 'fixed', 'top-0', 'left-0', 'right-0', 'mt-2', 'px-2', 'mx-auto', 'z-10', 'w-full', 'md:w-1/2', 'lg:w-1/3', alertColors[type]);
    alert.id = alertId;

    let alertContent = `
        <span class="sr-only">Info</span>
        <div class="ms-3 text-sm font-medium">
            ${message}.
        </div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-${type}-50 text-${type}-500 rounded-lg focus:ring-2 focus:ring-${type}-400 p-1.5 hover:bg-${type}-200 inline-flex items-center justify-center h-8 w-8 dark:hover:bg-gray-700" data-dismiss-target="#${alertId}" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    `;

    alert.innerHTML = alertContent;

    // Add event listener to the close button
    const closeButton = alert.querySelector('button');
    closeButton.addEventListener('click', () => {
        alert.remove();
    });

    // Append alert to body
    document.body.appendChild(alert);
}