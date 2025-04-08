import { polarToRect } from "@/lib/functions/polar-coordinate-functions"
import Image from "next/image"

function HourPath({hour, outerRadius, innerRadius}: {hour: number, outerRadius: number, innerRadius: number}) {

    const l1 = polarToRect(outerRadius, outerRadius, outerRadius, (hour - 1) * 30)
    const l2 = polarToRect(outerRadius, outerRadius, innerRadius, (hour - 1) * 30)
    const l3 = polarToRect(outerRadius, outerRadius, innerRadius, hour * 30)
    const l4 = polarToRect(outerRadius, outerRadius, outerRadius, hour * 30)

    return (
        <path 
            d={`
                M ${l1.x} ${l1.y} 
                L ${l2.x} ${l2.y} 
                L ${l3.x} ${l3.y} 
                L ${l4.x} ${l4.y} 
                Z
            `} 
            className="fill-none stroke-de_orange_light_muted"
        />
    )
}

export default function Clock() {
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const size = 1600
    const mercuryStartingLocation = polarToRect(size / 2, size / 2, 200, 0)

    return (
        <div className="absolute" style={{ top: `calc(50% - ${size / 2}px)`, left: `calc(50% - ${size / 2}px)`, animation: "spin 3600s linear infinite" }}>
            <svg width={size} height={size} overflow="visible" xmlns="http://www.w3.org/2000/svg">
                {hours.map(hour => (
                    <HourPath key={hour} hour={hour} outerRadius={size / 2} innerRadius={150} />
                ))}
                <foreignObject width={50} height={50} x={mercuryStartingLocation.x} y={mercuryStartingLocation.y} style={{ transformOrigin: `${size / 2}px ${size / 2}px`, animation: "spin 3300s linear infinite" }}>
                    <Image src="/planet-mercury.png" alt="planet-mercury" width={48} height={48} />
                </foreignObject>
            </svg>
        </div>
    )
}