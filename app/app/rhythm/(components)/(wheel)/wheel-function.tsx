import { DayOfWeek, MappableInstances } from "@/lib/types/rhythm-types"
import { useState } from "react"
import RitualInstanceSector from "./ritual-instance-sector"
import WheelDaySelector from "./wheel-day-selector"

interface WheelFunctionProps {
    svgSize: number
    instances: MappableInstances,
    center: number
    outerCircleRadius: number
    innerRadius: number
}

export default function WheelFunction({ svgSize, instances, center, outerCircleRadius, innerRadius }: WheelFunctionProps) {

    const days: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(days[today])

    return (
        <>
            <defs>
                <linearGradient id="rose-gradient" gradientTransform="rotate(45)">
                    <stop offset="10%" stopColor="#4c0519" />
                    <stop offset="30%" stopColor="#600721" />
                    <stop offset="50%" stopColor="#740b29" />
                    <stop offset="70%" stopColor="#890e31" />
                    <stop offset="90%" stopColor="#9f1239" />
                </linearGradient>
                <linearGradient id="fuscia-gradient" gradientTransform="rotate(45)">
                    <stop offset="10%" stopColor="#4a044e" />
                    <stop offset="30%" stopColor="#58085e" />
                    <stop offset="50%" stopColor="#670e6e" />
                    <stop offset="70%" stopColor="#77137e" />
                    <stop offset="90%" stopColor="#86198f" />
                </linearGradient>
                <linearGradient id="violet-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor=" #2e1065" />
                    <stop offset="30%" stopColor="#391479" />
                    <stop offset="50%" stopColor="#44198d" />
                    <stop offset="70%" stopColor="#4f1da1" />
                    <stop offset="90%" stopColor="#5b21b6" />
                </linearGradient>
                <linearGradient id="indigo-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#1e1b4b" />
                    <stop offset="30%" stopColor="#242060" />
                    <stop offset="50%" stopColor="#2a2676" />
                    <stop offset="70%" stopColor="#302b8c" />
                    <stop offset="90%" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="sky-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#082f49" />
                    <stop offset="30%" stopColor="#093957" />
                    <stop offset="50%" stopColor="#094366" />
                    <stop offset="70%" stopColor="#094e75" />
                    <stop offset="90%" stopColor="#075985" />
                </linearGradient>
                <linearGradient id="zinc-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#09090b" />
                    <stop offset="30%" stopColor="#131314" />
                    <stop offset="50%" stopColor="#1a1a1c" />
                    <stop offset="70%" stopColor="#202023" />
                    <stop offset="90%" stopColor="#27272a" />
                </linearGradient>
                <linearGradient id="emerald-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#022c22" />
                    <stop offset="30%" stopColor="#02382b" />
                    <stop offset="50%" stopColor="#024534" />
                    <stop offset="70%" stopColor="#03523d" />
                    <stop offset="90%" stopColor="#065f46" />
                </linearGradient>
                <linearGradient id="amber-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#451a03" />
                    <stop offset="30%" stopColor="#572309" />
                    <stop offset="50%" stopColor="#6a2c0c" />
                    <stop offset="70%" stopColor="#7e360d" />
                    <stop offset="90%" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="slate-gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#020617" />
                    <stop offset="30%" stopColor="#0d121f" />
                    <stop offset="50%" stopColor="#131a28" />
                    <stop offset="70%" stopColor="#182131" />
                    <stop offset="90%" stopColor="#1e293b" />
                </linearGradient>
            </defs>
            {instances[day].map(instance => (
                <RitualInstanceSector key={instance.id} instance={instance} center={center} outerRadius={outerCircleRadius} innerRadius={innerRadius} />
            ))}
            <WheelDaySelector svgSize={svgSize} center={center} day={day} setDay={setDay} days={days} innerCircleRadius={innerRadius} />
        </>
    )
}