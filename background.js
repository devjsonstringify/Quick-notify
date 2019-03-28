'use strict'

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

chrome.notifications.onButtonClicked.addListener(function() {
	chrome.storage.sync.get(['minutes'], function(item) {
		chrome.browserAction.setBadgeText({ text: 'ON' })
		chrome.alarms.create({ delayInMinutes: item.minutes })
	})
})
