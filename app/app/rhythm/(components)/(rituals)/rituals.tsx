import { Dispatch, SetStateAction } from "react"
import AddRitualPopover from "./add-ritual-popover"

type RitualProps = {
    createRitualPopoverControl: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}
}

export default function Rituals({ createRitualPopoverControl }: RitualProps) {

    console.log(createRitualPopoverControl)

    return (
        <>
            <div>Rituals</div>
            <AddRitualPopover popoverControl={createRitualPopoverControl} />
        </>
    )
}