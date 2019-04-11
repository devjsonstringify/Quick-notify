;('use strict')

// * Clear alarm
export function clearAlarm() {
	// Set Badge
	let badge = {
		text: ''
	}
	chrome.browserAction.setBadgeText(badge)
	chrome.alarms.clearAll()
	window.close()
}
export function closeWindow(e) {
	e.preventDefault
	window.close()
}
