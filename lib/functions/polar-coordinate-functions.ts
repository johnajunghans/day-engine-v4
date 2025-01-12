function polarToRect(cx: number, cy: number, r: number, t: number) {
    return { x: cx - r * Math.cos(t * Math.PI / 180), y: cy - r * Math.sin(t * Math.PI / 180) }
}

export { 
    polarToRect
}