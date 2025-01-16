'use client'

import { useState } from "react"
import AddRitualPopover from "./add-ritual-popover"
import LabelledPanel from "@/app/app/(components)/labelled-panel"
import { Ritual } from "@/lib/types/rhythm-types"
import RitualTile from "./ritual-tile"
import { Accordion } from "@/components/ui/accordion"
import { useRituals } from "@/context/rituals-provider"

type RitualProps = {
    
}

export default function Rituals({ }: RitualProps) {

    const [addRitualPopoverOpen, setAddRitualPopoverOpen] = useState(false)
    const { state: rituals } = useRituals()

    return (
        <LabelledPanel 
            title="RITUALS" 
            size={34} minSize={20} maxSize={40} 
            popover={<AddRitualPopover popoverControl={{ isOpen: addRitualPopoverOpen, setIsOpen: setAddRitualPopoverOpen }} />}
            bottomBorder
        >
            <div className={`${addRitualPopoverOpen ? "blur-sm" : "blur-0"}`}>
                <Accordion type="multiple">
                    {rituals.map(ritual => (
                        <RitualTile key={ritual.id} ritual={ritual} />
                    ))}
                </Accordion>  
            </div>
        </LabelledPanel>
    )
}