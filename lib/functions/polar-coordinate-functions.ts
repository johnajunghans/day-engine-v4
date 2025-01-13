type Coordinates = { x: number, y: number }

function polarToRect(cx: number, cy: number, r: number, t: number): Coordinates {
    return { x: cx - r * Math.cos(t * Math.PI / 180), y: cy - r * Math.sin(t * Math.PI / 180) }
}

function timeStringToHours(time: string): number {
    return Number(time.slice(0,2)) + Number(time.slice(3,5)) / 60
}

function hoursToDegrees(hours: number, springPoint = 6): number {
    return 15 * hours - 15 * springPoint
}

function timeStringToDegrees(time: string, springPoint = 6): number {
    return hoursToDegrees(timeStringToHours(time), springPoint)
}

function timeToCoordinates(time: string | number, cx: number, cy: number, r: number, springPoint = 6): Coordinates {
    // Time can be either a string or a number
    // If time is a number, it is assumed to be in hours

    if (typeof time === "string") {
        return polarToRect(cx, cy, r, timeStringToDegrees(time, springPoint))
    } else {
        return polarToRect(cx, cy, r, hoursToDegrees(time, springPoint))
    }

}

export { 
    polarToRect,
    timeStringToHours,
    hoursToDegrees,
    timeStringToDegrees,
    timeToCoordinates
}