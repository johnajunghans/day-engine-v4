'use client'

import { useState } from "react"
import AddRitualPopover from "./add-ritual-popover"
import LabelledPanel from "@/app/app/(components)/labelled-panel"

type RitualProps = {
    
}

export default function Rituals({  }: RitualProps) {

    const [addRitualPopoverOpen, setAddRitualPopoverOpen] = useState(false)
    console.log(addRitualPopoverOpen)

    return (
        <LabelledPanel 
            title="RITUALS" 
            popover={
                <AddRitualPopover popoverControl={{ isOpen: addRitualPopoverOpen, setIsOpen: setAddRitualPopoverOpen }} />}>
            <div>Rituals</div>
        </LabelledPanel>
    )
}