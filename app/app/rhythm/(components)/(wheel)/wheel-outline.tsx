import { polarToRect } from "@/lib/functions/polar-coordinate-functions";

interface WheelOutline {
    svgSize: number
}

export default function WheelOutline({ svgSize }: WheelOutline) {

    const center = svgSize / 2
    const outerCircleRadius = svgSize * 0.45

    const rotations = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345];
    const timeMarkers = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];
    const miliTimeMarkers = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00"];

    console.log(center, outerCircleRadius)

    function TimeMarker({ time, rot }: { time: string, rot: number }) {

        const x = polarToRect(center, center, outerCircleRadius+30, rot).x
        const y = polarToRect(center+10, center, outerCircleRadius+20, rot).y

        return (
            <text 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="fill-de_orange_light text-xs"
                x={x} y={y}
            >{time}</text>
        )
    }

    return (
        <g id="wheel-outline">
            <circle cx={center} cy={center} r={outerCircleRadius} className="fill-none stroke-de_orange_light_muted" />
            <g id="lines-wrapper">
                {rotations.map(rot => (
                    <path
                        key={rot} 
                        className={`stroke-de_orange_light_muted rotate-[${rot}deg] origin-[${center} ${center}]`}
                        style={{transform: `rotate(${rot}deg)`, transformOrigin: `${center}px ${center}px`}}
                        d={`M ${center} ${center} L ${center - outerCircleRadius - 10} ${center}`}
                    />
                ))}
            </g>
            <g id="time-markers-wrapper">
                {timeMarkers.map((marker, index)=> (
                    <TimeMarker key={marker} time={marker} rot={index*15} />
                ))}
            </g>
        </g>
    )
}