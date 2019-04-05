'use strict'

// * Clear all previous settings on chrome start up
chrome.runtime.onStartup.addListener(function() {
		chrome.browserAction.setBadgeText({ text: '' })
	 chrome.alarms.clearAll()
 })

// * Notifications
chrome.alarms.onAlarm.addListener(function(alarms) {
	chrome.browserAction.setBadgeText({ text: '' })
	chrome.storage.sync.get(['message'], function(item) {
		chrome.notifications.create({
			type: 'basic',
			iconUrl: 'notification.png',
			title: `Hey! Busy ? don't forget about this reminder`,
			message: `${item.message}`,
			buttons: [{ title: 'snooze.' }],
			priority: 0
		})
	})
})

// * Snooze event / Click event
chrome.notifications.onButtonClicked.addListener(function() {
	chrome.storage.sync.get(['minutes'], function(item) {
		chrome.browserAction.setBadgeText({ text: 'ON' })
		chrome.alarms.create({ delayInMinutes: item.minutes })
	})
})
