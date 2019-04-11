;('use strict')

// * Globals variables
const currenTime = moment().format('ddd, h:mm:ss a')
let userInput = document.querySelector('input[type="number"]')
const closeBtn = document.querySelector('#closeBtn')
const alarmBtn = document.querySelector('#alarmOn')
const alarmOff = document.querySelector('#alarmOff')
const notification = document.querySelector('#notification')
let userInputMessage = document.querySelector('#userMessage')

// * Show current time
async function displayTime() {
	const time = await moment().format('ddd, h:mm:ss a')
	const html = `<h6 class="mb-0"> Current time is: <p class="mb-0 text-secondary">${time}</p></h6>`
	document.querySelector('#currenTime').innerHTML = html
}

// * Update current time
const updatingTime = setInterval(displayTime, 1000)

// * At first check input tag if alarm already set if so disable it
chrome.browserAction.getBadgeText({}, function(isActive) {
	if (isActive == 'On') {
		disabledUserInput()
		chrome.storage.sync.get(['minutes', 'message'], function(item) {
			setAlarmTime(item.minutes, item.message)
		})
	}
})

// * Disabled users input after successful input
function disabledUserInput() {
	alarmBtn.disabled = true
	userInput.style.display = 'none'
	userInputMessage.style.display = 'none'
	document.querySelector('#currenTime').style.display = 'none'
	clearInterval(updatingTime) // Stop the current time from updating..
}

// * Set alarm end
function setAlarmTime(timestamp, message) {
	let calculatedTime = moment()
		.add(timestamp, 'm')
		.format('ddd, h:mm:ss:a')
	// Display user input
	const msg = `<p class="text-success msg">I will notify you at,
	${calculatedTime} regarding ${message}</p>`
	document.querySelector('.alert-info').classList.toggle('h-100')
	setNotification('Well Done!', 'text-success', msg, false)
}

// * Set alarm end
function timeRemaining() {
	chrome.alarms.getAll(function(alarms) {
		console.log(alarms)
	})
}

// * Set Alarm
function setAlarm(e) {
	// * Local scope var
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
		disabledUserInput()
		chrome.storage.sync.get(['minutes', 'message'], function(item) {
			setAlarmTime(item.minutes, item.message)
		})
	} else {
		// * Validate
		setNotification('Error', 'text-danger', 'All fields are required', true)
	}
}

// * Notification
function setNotification(title, className, message, btn) {
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

function clearAlarm() {
	// Set Badge
	let badge = {
		text: ''
	}
	chrome.browserAction.setBadgeText(badge)
	chrome.alarms.clearAll()
	window.close()
}

function closeWindow(e) {
	e.preventDefault
	window.close()
}

// * Events

closeBtn.addEventListener('click', closeWindow, false)
alarmBtn.addEventListener('click', setAlarm, false)
alarmOff.addEventListener('click', clearAlarm, false)
