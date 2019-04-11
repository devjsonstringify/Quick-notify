;('use strict')

// * Show current time
export async function currentTime() {
	const time = await moment().format('ddd, h:mm:ss a')
	const html = `<h6 class="mb-0"> Current time is: <p class="mb-0 text-secondary">${time}</p></h6>`
	document.querySelector('#currenTime').innerHTML = html
}
