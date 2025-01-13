import { polarToRect, timeStringToDegrees } from "@/lib/functions/polar-coordinate-functions"
import { RitualInstance } from "@/lib/types/rhythm-types"

interface RitualInstanceSectorProps {
    instance: RitualInstance,
    center: number,
    outerRadius: number
}

function calcSectCoordinates(sa: number, ea: number, c: number, r: number, br: number, sp: number) {
    // Params: start angle, end angle, center, radius, border radius, spring point
    
    // Adjusted Radius
    const ar = r - br - 1
    // Adjusted Angle
    const aa = br * 360 / (2 * Math.PI * r)

    return {
        oS: polarToRect(c, c, ar, sa),
        iS: polarToRect(c, c, r - 1, sa + aa),
        iE: polarToRect(c, c, r - 1, ea - aa),
        oE: polarToRect(c, c, ar, ea)
    }
}

function avg(a: number, b: number) {
    return (a + b) / 2
}

export default function RitualInstanceSector({ instance, center, outerRadius }: RitualInstanceSectorProps) {

    const br = 10
    const sp = 6

    // Calculate start angle and end angle (in degrees)
    const sa = timeStringToDegrees(instance.start_time, sp)
    const ea = timeStringToDegrees(instance.end_time, sp)

    // const xy = calcSector(instance.start_time, instance.end_time, center, outerRadius, br, sp)
    const xy = calcSectCoordinates(sa, ea, center, outerRadius, br, sp)

    // Calculate text center - midpoint of outer xy points
    const tc = { x: avg(xy.oS.x, xy.oE.x), y: avg(xy.oS.y, xy.oE.y) }
    // Calculate text angle 
    const ta = avg(sa, ea)
    // Flip text boolean check
    const ft = ta >= 90 && ta < 270 ? true : false

    return (
        <g>
            <path 
                d={`
                    M ${center} ${center}
                    L ${xy.oS.x} ${xy.oS.y}
                    A ${br} ${br} 1 0 1 ${xy.iS.x} ${xy.iS.y}
                    A ${outerRadius} ${outerRadius} 1 0 1 ${xy.iE.x} ${xy.iE.y}
                    A ${br} ${br} 1 0 1 ${xy.oE.x} ${xy.oE.y}
                    Z
                `}
                fill={`url('#${instance.Rituals.color}-gradient')`}
                className={`hover:stroke-white/50`}
            />
            <text
                x={tc.x} y={tc.y}
                textAnchor={ft ? "end" : "start"} alignmentBaseline="central"
                style={{transform: `rotate(${ft ? ta + 180 : ta}deg)`, transformOrigin: `${tc.x}px ${tc.y}px`}}
                className="fill-white/80 text-lg pointer-events-none"
            >{instance.Rituals.name}</text>
        </g>
    )
}
