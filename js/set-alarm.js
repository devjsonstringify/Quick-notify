;('use strict')

import { notification } from './notification.js'
import { disabledUserInput } from './disabled-element.js'
import updateTime from './updating-time.js'
import { setAlarmTime as success } from './alarm-success.js'

// * Set Alarm
export function setAlarm(e) {
	// * Local scope var
	const userInput = document.querySelector('input[type="number"]')
	const userInputMessage = document.querySelector('#userMessage')
	let minutes = parseFloat(userInput.value)
	let message = userInputMessage.value

	if (minutes && message) {
		// Set Badge
		let badge = {
			text: 'On'
		}
		chrome.browserAction.setBadgeText(badge)
		chrome.browserAction.setBadgeBackgroundColor({
			color: '#ff0000'
		})

		// * Create alarm
		const AlarmInfo = {
			delayInMinutes: minutes
		}
		// * Set data
		chrome.alarms.create(AlarmInfo)
		chrome.storage.sync.set({
			minutes: minutes,
			message: `${message}`
		})
		// * Toggle events
		disabledUserInput(updateTime)
		chrome.storage.sync.get(['minutes', 'message'], function(item) {
			success(item.minutes, item.message)
		})
	} else {
		// * Validate
		notification('Error', 'text-danger', 'All fields are required', true)
	}
}
