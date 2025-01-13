'use client'

import LabelledPanel from "@/app/app/(components)/labelled-panel";
import { MappableInstances } from "@/lib/types/rhythm-types";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { debounce, isEqual } from "lodash";
import WheelOutline from "./wheel-outline";
import WheelFunction from "./wheel-function";
import AddInstancePopover from "./add-instance-popover";

interface WheelMainProps {
    instances: MappableInstances
}

export default function WheelMain({ instances }: WheelMainProps) {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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
    const outerCircleRadius = svgSize * 0.45
    
    return (
        <LabelledPanel title="WHEEL" ref={panelRef} onResize={debounce(() => handleWheelResize(), 500)} centerContents popover={<AddInstancePopover popoverControl={{ isOpen: isPopoverOpen, setIsOpen: setIsPopoverOpen}} />}>
            {svgSize && <svg width={svgSize} height={svgSize} overflow="visible" className={`mx-2 ${isPopoverOpen ? "blur-sm" : "blur-0"} transition-[blur]`}>
                <WheelOutline svgSize={svgSize} center={center} outerCircleRadius={outerCircleRadius} />
                <WheelFunction svgSize={svgSize} instances={instances} center={center} outerCircleRadius={outerCircleRadius} />
            </svg>}
        </LabelledPanel>
    )
}