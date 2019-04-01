;('use strict')

// * Globals
const currenTime = moment().format('ddd, h:mm:ss a')
let userInput = document.querySelector('input[type="number"]')
const closeBtn = document.querySelector('#closeBtn')
const alarmBtn = document.querySelector('#alarmOn')
const alarmOff = document.querySelector('#alarmOff')
const notification = document.querySelector('#notification')
const userInputMessage = document.querySelector('#userMessage')

// * Automatically close window when alarm is fired
chrome.alarms.onAlarm.addListener(function(alarms) {
	clearAlarm()
})

// * Updating time
async function displayTime() {
	const currTime = await moment().format('ddd, h:mm:ss a')
	const html = `<h6 class="mb-0"> Current time is: <p class="mb-0 text-dark">${currTime}</p></h6>`
	document.querySelector('#currenTime').innerHTML = html
}

setInterval(displayTime, 1000)

// * At first check input tag if alarm already set if so disable it
chrome.browserAction.getBadgeText({}, function(isActive) {
	if (isActive == 'On') {
		disabledUserInput()
		chrome.storage.sync.get(['minutes', 'message'], function(item) {
			setAlarmTime(item.minutes)
		})
	}
})

// * Disable and value empty of userInput
function disabledUserInput() {
	alarmBtn.disabled = true
	userInput.style.display = 'none'
	userInputMessage.style.display = 'none'
	document.querySelector('#currenTime').style.display = 'none'
}

// * Set alarm end
function setAlarmTime(timestamp) {
	let message = userInputMessage.value

	let calculatedTime = moment()
		.add(timestamp, 'm')
		.format('ddd, h:mm:ss:a')
	// Display user input
	const msg = `<h6>I will notify you at </h6>
	<p class="text-dark msg">${calculatedTime}
	regarding ${message}</p>`
	setNotification('Well Done!', 'text-success', msg)
}

// * Set alarm end
function timeRemaining(minutes) {
	chrome.alarms.getAll(function(alarms) {
		console.log(alarms)
		console.log(alarms[0])
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
		setAlarmTime(minutes)
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

closeBtn.addEventListener('click', closeWindow, false)
alarmBtn.addEventListener('click', setAlarm, false)
alarmOff.addEventListener('click', clearAlarm, false)
