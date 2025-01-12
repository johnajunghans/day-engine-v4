'use client'

import LabelledPanel from "@/app/app/(components)/labelled-panel";
import { RitualInstance } from "@/lib/types/rhythm-types";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { debounce, isEqual } from "lodash";
import WheelOutline from "./wheel-outline";

interface WheelMainProps {
    ritualInstances: RitualInstance[]
}

export default function WheelMain({ ritualInstances }: WheelMainProps) {

    const panelRef = useRef<HTMLDivElement>(null)
    const [panelDimensions, setPanelDimensions] = useState({ width: 0, height: 0 })

    const handleWheelResize = useCallback(() => {
            if (panelRef.current) {
                const clientRect = panelRef.current.getBoundingClientRect()
                const dimensions = { width: clientRect.width, height: clientRect.height }
                if (!isEqual(dimensions, panelDimensions)) {
                    setPanelDimensions(dimensions)
                }   
            }
        }, [panelDimensions]
    ) 

    useLayoutEffect(() => {
        debounce(() => handleWheelResize(), 0)
    }, [handleWheelResize])

    const svgSize = panelDimensions.height >= panelDimensions.width ? panelDimensions.width : panelDimensions.height;
    console.log(svgSize, panelDimensions)
    
    return (
        <LabelledPanel title="WHEEL" ref={panelRef} onResize={debounce(() => handleWheelResize(), 500)} centerContents>
            <svg width={svgSize} height={svgSize}>
                {svgSize && <WheelOutline svgSize={svgSize} />}
            </svg>
        </LabelledPanel>
    )
}