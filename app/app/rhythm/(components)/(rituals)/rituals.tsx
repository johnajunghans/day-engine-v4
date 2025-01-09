'use client'

import { useState } from "react"
import AddRitualPopover from "./add-ritual-popover"
import LabelledPanel from "@/app/app/(components)/labelled-panel"
import { Ritual } from "@/lib/types/rhythm-types"

type RitualProps = {
    rituals: Ritual[]
}

export default function Rituals({ rituals }: RitualProps) {

    const [addRitualPopoverOpen, setAddRitualPopoverOpen] = useState(false)
    console.log(rituals)

    return (
        <LabelledPanel title="RITUALS" popover={<AddRitualPopover popoverControl={{ isOpen: addRitualPopoverOpen, setIsOpen: setAddRitualPopoverOpen }} />}>
            <div className={`${addRitualPopoverOpen ? "blur-sm" : ""}`}></div>
        </LabelledPanel>
    )
}