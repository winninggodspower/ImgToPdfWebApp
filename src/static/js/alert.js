
let alertColors = {
    'success': 'alert-success',
    'info': 'alert-info',
    'warning': 'alert-warning',
    'error': 'alert-error',
}

let destroyAlert = (e) => {
    button = e.target;
    button.parentElement.parentElement.remove()
}

export function Alert(message, type) {
    // calling destory alert just so it will be added to build function
    destroyAlert

    // type should be on of these => 'success', 'info', 'warning', 'error'
    let alert = document.createElement('div');
    alert.classList.add('w-full', 'md:w-1/2', 'lg:w-1/3', 'fixed', 'top-0', 'left-0', 'right-0', 'mt-2', 'px-2', 'mx-auto', 'z-10')
    let alertContent = `
        <div class="px-4 py-2 mb-4 ${alertColors[type]} border  rounded-md flex items-center justify-between">
         <span>${message}</span>
         <button type="button" onclick="destroyAlert()" class="ml-2 text-blue-500 hover: ${alertColors[type].text}" aria-label="Close">&times;</button>
        </div>`
    alert.innerHTML = alertContent;

    // append alert to body
    document.body.appendChild(alert)
}