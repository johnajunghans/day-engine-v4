import { DayOfWeek, MappableInstances } from "@/lib/types/rhythm-types"
import { useState } from "react"
import RitualInstanceSector from "./ritual-instance-sector"
import WheelDaySelector from "./wheel-day-selector"

interface WheelFunctionProps {
    svgSize: number
    instances: MappableInstances,
    center: number
}

export default function WheelFunction({ svgSize, instances, center }: WheelFunctionProps) {

    const days: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(days[today])

    return (
        <>
            {instances[day].map(instance => (
                <RitualInstanceSector key={instance.id} svgSize={svgSize} instance={instance} />
            ))}
            <WheelDaySelector svgSize={svgSize} center={center} day={day} setDay={setDay} days={days} />
        </>
    )
}