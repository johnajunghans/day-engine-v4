function getElapsedWeeks(date1: Date, date2: Date) {
    return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 604800000)
}

export { 
    getElapsedWeeks 
}