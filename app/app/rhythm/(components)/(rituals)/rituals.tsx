'use client'

import AddRitualPopover from "./add-ritual-popover"
import LabelledPanel from "@/app/app/(components)/labelled-panel"
import RitualTile from "./ritual-tile"
import { Accordion } from "@/components/ui/accordion"
import { useRituals } from "@/context/rituals-provider"

// type RitualProps = {
    
// }

export default function Rituals({ }) {

    console.log("rituals rerendered")

    // const [addRitualPopoverOpen, setAddRitualPopoverOpen] = useState(false)
    const { state: rituals } = useRituals()

    return (
        <LabelledPanel 
            title="RITUALS" 
            size={34} minSize={20} maxSize={40} 
            popover={<AddRitualPopover />}
            bottomBorder
        >
            <div>
                <Accordion type="multiple">
                    {rituals.map(ritual => (
                        <RitualTile key={ritual.id} ritual={ritual} />
                    ))}
                </Accordion>  
            </div>
        </LabelledPanel>
    )
}