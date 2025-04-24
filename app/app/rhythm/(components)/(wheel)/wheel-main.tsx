'use client'

import LabelledPanel from "@/app/app/(components)/labelled-panel";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import WheelOutline from "./wheel-outline";
import WheelFunction from "./wheel-function";
import AddInstancePopover from "./add-instance-popover";
// import { SunMoon } from "lucide-react";
// import { Button } from "@/components/ui/button";

function WheelControl() {
    return (
        <div className="flex items-center justify-center gap-1">
            <AddInstancePopover />
            {/* <Button variant="icon" size="icon">
                <SunMoon size={24} strokeWidth={2} className="stroke-de_orange" />
            </Button> */}
        </div>
    )
}

export default function WheelMain() {

    const panelRef = useRef<HTMLDivElement>(null)
    const [panelDimensions, setPanelDimensions] = useState({ width: 600, height: 600 })

    const handleWheelResize = useCallback(() => {
            if (panelRef.current) {
                const clientRect = panelRef.current.getBoundingClientRect()
                const dimensions = { width: clientRect.width, height: clientRect.height }
                // Two conditions for re-rendering the wheel:
                // (1) The new height is greater than the new width (so the width would be determining the wheel size)
                // (2) The old height is greater than the old width AND the new height is less than the new width
                if (dimensions.height >= dimensions.width || panelDimensions.height >= panelDimensions.width && dimensions.height < dimensions.width) {
                    setPanelDimensions(dimensions)
                }   
            }
        }, [panelDimensions.width, panelDimensions.height]
    ) 

    useLayoutEffect(() => {
        handleWheelResize()
    }, [handleWheelResize])

    const dimension = panelDimensions.height > panelDimensions.width ? panelDimensions.width : panelDimensions.height;
    const svgSize = dimension >= 600 ? dimension : 600 
    const center = svgSize / 2
    const outerCircleRadius = svgSize * 0.45
    const innerCircleRadius = svgSize * 0.16
    
    return (
        <LabelledPanel 
            title="WHEEL"
            size={66} minSize={60} maxSize={80}
            ref={panelRef} 
            onResize={debounce(() => handleWheelResize(), 500)} 
            centerContents 
            popover={<WheelControl />} 
           
        >
            {svgSize && <svg width={svgSize} height={svgSize} overflow="visible" className={`mx-2 transition-[blur] duration-200`}>
                <WheelOutline center={center} outerCircleRadius={outerCircleRadius} />
                <WheelFunction svgSize={svgSize} center={center} outerCircleRadius={outerCircleRadius} innerRadius={innerCircleRadius} />
            </svg>}
        </LabelledPanel>
    )
}