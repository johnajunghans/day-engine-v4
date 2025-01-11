'use client'

import { useState } from "react"
import AddRitualPopover from "./add-ritual-popover"
import LabelledPanel from "@/app/app/(components)/labelled-panel"
import { Ritual } from "@/lib/types/rhythm-types"
import RitualTile from "./ritual-tile"

type RitualProps = {
    rituals: Ritual[]
}

export default function Rituals({ rituals }: RitualProps) {

    const [addRitualPopoverOpen, setAddRitualPopoverOpen] = useState(false)

    return (
        <LabelledPanel title="RITUALS" popover={<AddRitualPopover popoverControl={{ isOpen: addRitualPopoverOpen, setIsOpen: setAddRitualPopoverOpen }} />}>
            <div className={`flex flex-col gap-4 items-center p-4 ${addRitualPopoverOpen ? "blur-sm" : ""}`}>
                {rituals.map(ritual => (
                    <RitualTile key={ritual.id} ritual={ritual} />
                ))}
            </div>
        </LabelledPanel>
    )
}