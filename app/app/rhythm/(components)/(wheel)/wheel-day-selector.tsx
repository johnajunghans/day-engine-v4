import { polarToRect } from "@/lib/functions/polar-coordinate-functions"
import { DayOfWeek } from "@/lib/types/rhythm-types"
import { Infinity } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface WheelDaySelectorProps {
    svgSize: number
    day: DayOfWeek
    center: number
    setDay: Dispatch<SetStateAction<DayOfWeek>>
    days: DayOfWeek[]
}

export default function WheelDaySelector({ svgSize, day: activeDay, center, setDay, days }: WheelDaySelectorProps) {

    const innerCircleRadius = svgSize * 0.17
    
    function Text({ day, index }: { day: DayOfWeek,index: number }) {

        const angle = (51.429 * index - 12.857 - 51.429)
        const xy = polarToRect(center, center, innerCircleRadius-40, angle)

        return (
            <text
                x={xy.x}
                y={xy.y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`${activeDay === day ? "fill-background font-bold" : "fill-de_orange_light"} antialiased text-lg pointer-events-none`}
            >{day.slice(0,3)}</text>
        )
    }

    return (
        <g>
            <circle cx={center} cy={center} r={innerCircleRadius} className="fill-background drop-shadow-[0px_5px_6px_rgba(0,0,0,0.4)]" />
            {days.map((day, index) => (
                <path 
                    key={day}
                    role="button" tabIndex={0} aria-label={`Select ${day} Rituals`}
                    onClick={() => setDay(day)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault(); // Prevent default scrolling behavior for Space
                          setDay(day)
                        }
                    }}
                    d={`M ${center} ${center} L ${center} ${center+innerCircleRadius} A ${innerCircleRadius} ${innerCircleRadius} 1 0 1 ${center-innerCircleRadius*Math.cos(Math.PI*-38.671/180)} ${center-innerCircleRadius*Math.sin(Math.PI*-38.671/180)} Z`}
                    style={{transform: `rotate(${51.429 * index}deg)`, transformOrigin: `${center}px ${center}px`}}
                    className={`${activeDay === day ? "fill-de_orange_light" : "fill-white/0 hover:fill-white/5"} duration-150 transition-colors focus:outline-none focus-visible:outline-none focus-visible:stroke-de_orange`}
                />
            ))}
            {[0,1,2,3,4,5,6].map((num) => (
                <path 
                    key={num} 
                    d={`M ${center} ${center} L ${center} ${center+innerCircleRadius}`} 
                    style={{transform: `rotate(${51.429 * num}deg)`, transformOrigin: `${center}px ${center}px`}}
                    className="stroke-de_orange_light" 
                />
            ))}
            {days.map((day, index) => (
                <Text key={day} day={day} index={index} />
            ))}
            <g>
                <circle cx={center} cy={center} r={svgSize * 0.06} className="fill-background" />
                <circle
                    cx={center} cy={center} r={svgSize * 0.06}
                    role="button" tabIndex={0} aria-label="Select Daily Rituals"
                    onClick={() => setDay("Daily")}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault(); // Prevent default scrolling behavior for Space
                          setDay("Daily")
                        }
                    }}
                    className={`${activeDay === "Daily" ? "fill-de_orange_light" : "fill-background hover:fill-white/5"} stroke-de_orange_light focus:outline-none focus-visible:outline-none focus-visible:stroke-de_orange`}
                />
                <foreignObject width={svgSize*0.12} height={svgSize*0.12} x={center-svgSize*0.06} y={center-svgSize*0.06} className="pointer-events-none">
                    <div className="flex justify-center items-center w-full h-full">
                        <Infinity size={48} strokeWidth={1.25} className={`${activeDay === "Daily" ? "stroke-background" : "stroke-de_orange_light"}`} />
                    </div>
                </foreignObject>
            </g>
        </g>
    )
}