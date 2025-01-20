'use client'

import LabelledPanel from "@/app/app/(components)/labelled-panel";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import WheelOutline from "./wheel-outline";
import WheelFunction from "./wheel-function";
import AddInstancePopover from "./add-instance-popover";

// interface WheelMainProps {

// }

export default function WheelMain({ }) {

    const panelRef = useRef<HTMLDivElement>(null)
    const [panelDimensions, setPanelDimensions] = useState({ width: 0, height: 0 })

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
        }, [panelDimensions]
    ) 

    useLayoutEffect(() => {
        debounce(() => handleWheelResize(), 0)
    }, [handleWheelResize])

    const dimension = panelDimensions.height > panelDimensions.width ? panelDimensions.width : panelDimensions.height;
    const svgSize = dimension >= 600 ? dimension : 600 
    const center = svgSize / 2
    const outerCircleRadius = svgSize * 0.45
    const innerCircleRadius = svgSize * 0.16
    
    return (
        <LabelledPanel title="WHEEL" ref={panelRef} onResize={debounce(() => handleWheelResize(), 500)} centerContents popover={<AddInstancePopover />} bottomBorder>
            {svgSize && <svg width={svgSize} height={svgSize} overflow="visible" className={`mx-2 transition-[blur] duration-200`}>
                <WheelOutline center={center} outerCircleRadius={outerCircleRadius} />
                <WheelFunction svgSize={svgSize} center={center} outerCircleRadius={outerCircleRadius} innerRadius={innerCircleRadius} />
            </svg>}
        </LabelledPanel>
    )
}