'use client'

import { ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import LabelledPanel from "../(components)/labelled-panel";
import Rituals from "./(components)/(rituals)/rituals";
import { useState } from "react";

export default function Rhythm() {

    const [addRitualPopoverOpen, setAddRitualPopoverOpen] = useState(false)

    return (
        <ResizablePanelGroup direction="horizontal" className="flex-grow min-h-[calc(100vh-16px)] border border-de_orange_light_muted rounded-lg">
            <LabelledPanel title="RITUALS" btnFunction={() => setAddRitualPopoverOpen(true)}>
                <Rituals popoverOpen={addRitualPopoverOpen} />
            </LabelledPanel>
            <ResizableHandle />
            <LabelledPanel title="WHEEL" minW="100vh">

            </LabelledPanel>
        </ResizablePanelGroup>
    )
}