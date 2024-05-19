
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
    alert.classList.add('flex', 'items-center', 'p-4', 'mb-4', `text-${type}-800`, 'rounded-lg', `bg-${type}-50`, 'fixed', 'top-0', 'left-0', 'right-0', 'mt-2', 'px-2', 'mx-auto', 'z-10', 'w-full', 'md:w-1/2', 'lg:w-1/3', alertColors[type]);
    alert.id = alertId;

    let alertContent = `
        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div class="ms-3 text-sm font-medium">
            ${message} <a href="#" class="font-semibold underline hover:no-underline">example link</a>.
        </div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-${type}-50 text-${type}-500 rounded-lg focus:ring-2 focus:ring-${type}-400 p-1.5 hover:bg-${type}-200 inline-flex items-center justify-center h-8 w-8 dark:hover:bg-gray-700" data-dismiss-target="#${alertId}" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    `;

    alert.innerHTML = alertContent;

    // Append alert to body
    document.body.appendChild(alert);
}