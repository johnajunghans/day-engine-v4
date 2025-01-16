import { polarToRect, timeStringToDegrees } from "@/lib/functions/polar-coordinate-functions"
import { RitualInstance } from "@/lib/types/rhythm-types"

interface RitualInstanceSectorProps {
    instance: RitualInstance,
    center: number,
    outerRadius: number,
    innerRadius: number
}

function calcSectCoordinates(sa: number, ea: number, c: number, r: number, br: number, sp: number, t: "i" | "o") {
    // Params: start angle, end angle, center, radius, border radius, spring point, type (inner or outer)
    if (t !== "o" && t !== "i") throw Error("Type is incorrectly specified in 'calcSectCoordinates' in 'ritual-sector' component!")

    const ar = t === "o" ? r - br - 1 : r + br - 1
    // Adjusted Angle
    const aa = br * 360 / (2 * Math.PI * r)

    return {
        oS: polarToRect(c, c, ar, sa),
        iS: polarToRect(c, c, t === "o" ? r - 2 : r + 2, sa + aa),
        iE: polarToRect(c, c, t === "o" ? r - 2 : r + 2, ea - aa),
        oE: polarToRect(c, c, ar, ea)
    }
}

function avg(a: number, b: number) {
    return (a + b) / 2
}

export default function RitualInstanceSector({ instance, center, outerRadius, innerRadius }: RitualInstanceSectorProps) {

    const br = 6
    const sp = 6

    // Calculate start angle and end angle (in degrees)
    const sa = timeStringToDegrees(instance.start_time, sp)
    const ea = timeStringToDegrees(instance.end_time, sp)

    // const xy = calcSector(instance.start_time, instance.end_time, center, outerRadius, br, sp)
    const xy = calcSectCoordinates(sa, ea, center, outerRadius, br, sp, "o")
    const wz = calcSectCoordinates(sa, ea, center, innerRadius, br, sp, "i")

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
                    M ${wz.oE.x} ${wz.oE.y}
                    A ${br} ${br} 1 0 1 ${wz.iE.x} ${wz.iE.y}
                    A ${innerRadius} ${innerRadius} 1 0 0 ${wz.iS.x} ${wz.iS.y}
                    A ${br} ${br} 1 0 1 ${wz.oS.x} ${wz.oS.y} 
                    L ${xy.oS.x} ${xy.oS.y}
                    A ${br} ${br} 1 0 1 ${xy.iS.x} ${xy.iS.y}
                    A ${outerRadius} ${outerRadius} 1 0 1 ${xy.iE.x} ${xy.iE.y}
                    A ${br} ${br} 1 0 1 ${xy.oE.x} ${xy.oE.y}
                    Z
                `}
                fill={`url('#${instance.Rituals.color}-gradient')`}
                className={`hover:stroke-white/50 opacity-80`}
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
