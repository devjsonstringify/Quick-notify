;('use strict')

import { notification } from './notification.js'

// * Show Alarm successfully sets
export function setAlarmTime(timestamp, message) {
	let calculatedTime = moment()
		.add(timestamp, 'm')
		.format('ddd, h:mm:ss:a')
	// Display user input
	const msg = `<p class="text-success msg">I will notify you at,
	${calculatedTime} regarding ${message}</p>`
	document.querySelector('.alert-info').classList.toggle('h-100')
	notification('Well Done!', 'text-success', msg, false)
}
