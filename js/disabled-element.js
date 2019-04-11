;('use strict')

import updateTime from './updating-time.js'

// * Disabled users input after successful input
export function disabledUserInput() {
	document.querySelector('input[type="number"]').style.display = 'none'
	document.querySelector('#alarmOn').disabled = true
	document.querySelector('#userMessage').style.display = 'none'
	document.querySelector('#currenTime').style.display = 'none'
	clearInterval(updateTime) // Stop the current time from updating..
}
