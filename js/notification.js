;('use strict')

// * Notification
export function notification(title, className, message, btn) {
	const notification = document.querySelector('#notification')
	const closeBtn = `<button type="button" class=" close section position-absolute" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>`
	const html = `<div class='alert fade show mb-2 ${
		className == 'text-success' ? '' : 'border-bottom'
	}' role='alert'>
		${btn ? closeBtn : ''}
		<strong class='${className}'> ${title}!</strong>
		<p class='${className} notification-message mb-0 border-bottom-1'> ${message}</p>
		</div>`
	notification.innerHTML = html
}
