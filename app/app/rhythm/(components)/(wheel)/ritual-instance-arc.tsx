import { polarToRect, timeStringToDegrees } from "@/lib/functions/polar-coordinate-functions"
import { RitualInstance } from "@/lib/types/rhythm-types"
import EditInstanceSheet from "./edit-instance-sheet"
import { memo, useMemo, useState } from "react"
import { arc } from "d3-shape"

interface RitualInstanceSectorProps {
    instance: RitualInstance,
    center: number,
    outerRadius: number,
    innerRadius: number
}

function RitualInstanceSector({ instance, center, outerRadius, innerRadius }: RitualInstanceSectorProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Border radius and spring point
    const br = 6
    const sp = 6

    function calculateSectorData() {
        // Calculate start angle and end angle (in degrees)
        const sa = timeStringToDegrees(instance.start_time, sp)
        const ea = timeStringToDegrees(instance.end_time, sp) 

        // Handle the case where the time span crosses midnight
        // If end angle is less than start angle, add 360 degrees to end angle
        const adjustedEa = ea < sa ? ea + 360 : ea
        
        // Adjust both angles by -90 degrees to align with D3's coordinate system
        // (D3 starts at 12 o'clock and goes clockwise, we need to adjust)
        const startAngleRadians = (sa - 90) * Math.PI / 180
        const endAngleRadians = (adjustedEa - 90) * Math.PI / 180

        // Create d3 arc generator
        const arcGenerator = arc()
            .cornerRadius(br)
            .padAngle(0.005)

        // Generate the path data
        const pathData: string = arcGenerator({ 
            startAngle: startAngleRadians, 
            endAngle: endAngleRadians, 
            innerRadius: innerRadius + 3, 
            outerRadius: outerRadius - 3 
        }) || ''

        // Calculate text angle 
        const ta = ea >= sa ? (sa + ea) / 2 : (sa + ea + 360) / 2
        // Flip text boolean check
        const ft = ta >= 90 && ta < 270 ? true : false
        // Calculate text center
        const tc = polarToRect(center, center, outerRadius, ta)
        // Calculate text offset
        const to = outerRadius * 0.04

        return { pathData, ta, ft, tc, to }
    }

    const { pathData, ta, ft, tc, to } = useMemo(calculateSectorData, [instance.start_time, instance.end_time, center, outerRadius, innerRadius])

    return (
        <EditInstanceSheet instance={instance} isOpen={isOpen} setIsOpen={setIsOpen}>
            <g transform={`translate(${center}, ${center})`}>
                <path 
                    d={pathData}
                    fill={`url('#${instance.Rituals.color}-gradient')`}
                    className={`hover:stroke-white/50 opacity-80 cursor-pointer focus:outline-none focus:stroke-white/75 focus:opacity-90`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Edit Ritual Instance: ${instance.Rituals.name}`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsOpen(true)
                        }
                    }}
                    onClick={() => setIsOpen(true)}
                />
                <text
                    x={ft ? tc.x - center - to : tc.x - center + to} 
                    y={tc.y - center}
                    textAnchor={ft ? "end" : "start"} 
                    alignmentBaseline="central"
                    style={{transform: `rotate(${ft ? ta + 180 : ta}deg)`, transformOrigin: `${tc.x - center}px ${tc.y - center}px`}}
                    className="fill-white/80 text-lg pointer-events-none"
                >{instance.Rituals.name}</text>
            </g>
        </EditInstanceSheet>
    )
}

export default memo(RitualInstanceSector, (prevProps, nextProps) => {
    return prevProps === nextProps;
});
