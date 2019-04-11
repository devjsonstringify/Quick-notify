;('use strict')

import { currentTime } from './current-time.js'

// * Update current time
const updateTime = setInterval(currentTime, 1000)
export default updateTime
