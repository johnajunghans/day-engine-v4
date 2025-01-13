import { hoursToDegrees, polarToRect, timeStringToDegrees, timeStringToHours, timeToCoordinates } from "@/lib/functions/polar-coordinate-functions"
import { RitualInstance } from "@/lib/types/rhythm-types"

interface RitualInstanceSectorProps {
    svgSize: number
    instance: RitualInstance,
    center: number,
    outerRadius: number
}

function calcSector(st: string, et: string, c: number, r: number, br=5, sp=6) {
    // st - start time, et - end time, c - center, r - radius, br - border radius, sp - spring point

    // calculate adjusted radius for outer points
    const ar = r - br

    // calculate time adjustement for inner points
    const ta = br * 24 / (2 * Math.PI * r)

    return {
        oS: timeToCoordinates(st, c, c, ar, sp),
        iS: timeToCoordinates(timeStringToHours(st) + ta, c, c, r, sp),
        iE: timeToCoordinates(timeStringToHours(et) - ta, c, c, r, sp),
        oE: timeToCoordinates(et, c, c, ar, sp)
    }
}

function calcSectCoordinates(sa: number, ea: number, c: number, r: number, br: number, sp: number) {
    // Params: start angle, end angle, center, radius, border radius, spring point
    
    // Adjusted Radius
    const ar = r - br
    // Adjusted Angle
    const aa = br * 360 / (2 * Math.PI * r)

    return {
        oS: polarToRect(c, c, ar, sa),
        iS: polarToRect(c, c, r, sa + aa),
        iE: polarToRect(c, c, r, ea - aa),
        oE: polarToRect(c, c, ar, ea)
    }
}

function avg(a: number, b: number) {
    return (a + b) / 2
}

export default function RitualInstanceSector({ svgSize, instance, center, outerRadius }: RitualInstanceSectorProps) {

    const br = 12
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

// ----------------------------------- RITUAL SECTOR COMPONENT UPDATED WITH BORDER RADIUS AND CENTERED TEXT ------------------------------------ //

// import { Dispatch, SetStateAction } from "react";

// type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// type RitualInstance = {
//     id: number,
//     created_at: string,
//     days: DayOfWeek[],
//     start_time: string,
//     end_time: string,
//     ritual_id: number
//     name?: string
// }

// interface RitualSectorProps {
//     svgSize: number,
//     instance: RitualInstance,
//     outerCircleRadius: number,
//     setSelectedInstance: Dispatch<SetStateAction<RitualInstance | null>>
// }


// function time24HrStringToRawHours(time: string) {
//     const hour = Number(time.slice(0, 2));
//     const min = Number(time.slice(3,5));
//     return hour*1+min/60;
// }

// function time24HrStringToCoordinates(querentTime: string, radius: number, center: number, risingTime?: string) {
//     const querentHours = time24HrStringToRawHours(querentTime);
//     const risingHours = risingTime ? time24HrStringToRawHours(risingTime) : 6;
//     const timeDifferenceInRadians = (querentHours - risingHours)*Math.PI/12;
//     return [center-(radius*Math.cos(timeDifferenceInRadians)), center-(radius*Math.sin(timeDifferenceInRadians)), timeDifferenceInRadians]
// }

// function timeRawHoursToCoordinates(querentTime: number, risingTime: number, radius: number, center: number) {
//     const timeDifferenceInRadians = (querentTime - risingTime)*Math.PI/12;
//     return [center-(radius*Math.cos(timeDifferenceInRadians)), center-(radius*Math.sin(timeDifferenceInRadians))]
// }

// function calculateBorderRadiusCoordinates(startTime: string, endTime: string, radius: number, borderRadius: number, center: number) {
//     function adjustTimeForBorderRadius(borderRadius: number, radius: number) {
//         const circumference = radius*2*Math.PI;
//         return borderRadius*24/circumference;
//     }
//     const outerStartPoint = time24HrStringToCoordinates(startTime, radius-borderRadius, center)
//     const outerEndPoint = time24HrStringToCoordinates(endTime, radius-borderRadius, center)
//     const borderRadiusTimeAdjustment = adjustTimeForBorderRadius(borderRadius, radius)
//     const adjustedStartHours = time24HrStringToRawHours(startTime)+borderRadiusTimeAdjustment
//     const adjustedEndHours = time24HrStringToRawHours(endTime)-borderRadiusTimeAdjustment 
//     const innerStartPoint = timeRawHoursToCoordinates(adjustedStartHours, 6, radius, center)
//     const innerEndPoint = timeRawHoursToCoordinates(adjustedEndHours, 6, radius, center)
//     return { outerStartPoint, innerStartPoint, innerEndPoint, outerEndPoint }
// }
 
// const RitualSector: React.FC<RitualSectorProps> = ({ svgSize, instance, outerCircleRadius, setSelectedInstance }) => {

//     const center = svgSize/2
//     const borderRadius = 5;
//     const borderRadiusCoordinates = calculateBorderRadiusCoordinates(instance.start_time, instance.end_time, outerCircleRadius, borderRadius, center)

//     const xy = {
//         start: time24HrStringToCoordinates(instance.start_time, outerCircleRadius, center),
//         end: time24HrStringToCoordinates(instance.end_time, outerCircleRadius, center)
//     }
//     const avgAngle = (xy.start[2]+xy.end[2])/2
//     const avgAngleDeg = avgAngle*180/Math.PI

//     // Calculate the exact center coordinates for the text
//     const textCenter = {
//         x: (borderRadiusCoordinates.outerStartPoint[0] + borderRadiusCoordinates.outerEndPoint[0]) / 2,
//         y: (borderRadiusCoordinates.outerStartPoint[1] + borderRadiusCoordinates.outerEndPoint[1]) / 2
//     }

//     console.log(borderRadiusCoordinates, textCenter)

//     return (
//         <g id={`${instance.name}-instance-${instance.id}`}>
//             <path
//                 d={`
//                     M ${center} ${center}
//                     L ${borderRadiusCoordinates.outerStartPoint[0]} ${borderRadiusCoordinates.outerStartPoint[1]}
//                     A ${borderRadius} ${borderRadius} 1 0 1 ${borderRadiusCoordinates.innerStartPoint[0]} ${borderRadiusCoordinates.innerStartPoint[1]}
//                     A ${outerCircleRadius} ${outerCircleRadius} 1 0 1 ${borderRadiusCoordinates.innerEndPoint[0]} ${borderRadiusCoordinates.innerEndPoint[1]}
//                     A ${borderRadius} ${borderRadius} 1 0 1 ${borderRadiusCoordinates.outerEndPoint[0]} ${borderRadiusCoordinates.outerEndPoint[1]}
//                     Z
//                 `}
//                 fill="black"
//                 className="drop-shadow-[0px_0px_4px_rgba(0,0,0,0.4)] hover:fill-[var(--light-grey)] duration-200 cursor-pointer"
//                 onClick={() => setSelectedInstance(instance)}
//             />
//             {/* Changed the foreign element with chakra <p> tag inside to svg text element */}
//             {/* text-anchor and aligment-baseline attributes allow for more control over positioning */}
//             {instance.name && <text x={textCenter.x} y={textCenter.y} fill="white" textAnchor="left" alignmentBaseline="central"
//                 style={{
//                     // text is transformed based on the average angle in degrees
//                     transform: `rotate(${avgAngleDeg}deg)`,
//                     // tranform origin property is set to 'textCenter' point for proper rotation
//                     transformOrigin: `${textCenter.x}px ${textCenter.y}px`,
//                 }}
//             >
                
//             {instance.name}</text>}
//         </g>
//      );
// }
 
// export default RitualSector;