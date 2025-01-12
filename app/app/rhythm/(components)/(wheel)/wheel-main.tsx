'use client'

import LabelledPanel from "@/app/app/(components)/labelled-panel";
import { RitualInstance } from "@/lib/types/rhythm-types";
import { useLayoutEffect, useRef, useState } from "react";
import { debounce } from "lodash";

interface WheelMainProps {
    ritualInstances: RitualInstance[]
}

export default function WheelMain({ ritualInstances }: WheelMainProps) {

    const panelRef = useRef<HTMLDivElement>(null)
    const [panelDimensions, setPanelDimensions] = useState({ width: 0, height: 0 })

    function handleWheelResize() {
        if (panelRef.current) {
            const dimensions = panelRef.current.getBoundingClientRect()
            setPanelDimensions({ width: dimensions.width, height: dimensions.height })
        }
    }

    useLayoutEffect(() => {
        handleWheelResize()
    }, [])

    const wheelSize = panelDimensions.height >= panelDimensions.width ? panelDimensions.width : panelDimensions.height;

    console.log(panelDimensions, wheelSize)

    return (
        <LabelledPanel title="WHEEL" ref={panelRef} onResize={debounce(() => handleWheelResize(), 500)}>
            <svg>

            </svg>
        </LabelledPanel>
    )
}