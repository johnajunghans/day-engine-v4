import PopoverHeader from "@/components/ui/custom/popover-header"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { Dispatch, SetStateAction } from "react"

type AddRitualPopoverProps = {
    popoverControl: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}
}

export default function AddRitualPopover ({ popoverControl }: AddRitualPopoverProps) {

    return (
        <Popover open={popoverControl.isOpen} onOpenChange={popoverControl.setIsOpen}>
            <PopoverContent>
                <PopoverHeader title="Create New Ritual" closePopover={popoverControl.setIsOpen} />

            </PopoverContent>
        </Popover>
    )
}