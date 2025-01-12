'use client'

import LabelledPanel from "@/app/app/(components)/labelled-panel";
import { MappableInstances } from "@/lib/types/rhythm-types";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { debounce, isEqual } from "lodash";
import WheelOutline from "./wheel-outline";
import WheelFunction from "./wheel-function";

interface WheelMainProps {
    instances: MappableInstances
}

export default function WheelMain({ instances }: WheelMainProps) {

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
    const center = svgSize / 2
    
    return (
        <LabelledPanel title="WHEEL" ref={panelRef} onResize={debounce(() => handleWheelResize(), 500)} centerContents>
            {svgSize && <svg width={svgSize} height={svgSize} overflow="visible" className="mx-2">
                <WheelOutline svgSize={svgSize} center={center} />
                <WheelFunction svgSize={svgSize} instances={instances} center={center} />
            </svg>}
        </LabelledPanel>
    )
}