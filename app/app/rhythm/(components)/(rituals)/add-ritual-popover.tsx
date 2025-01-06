import { Button } from "@/components/ui/button"
import AddButton from "@/components/ui/custom/add-button"
import PopoverHeader from "@/components/ui/custom/popover-header"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

type AddRitualPopoverProps = {
    popoverControl: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }
}

export default function AddRitualPopover ({ popoverControl }: AddRitualPopoverProps) {

    return (
        <Popover open={popoverControl.isOpen} onOpenChange={popoverControl.setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="icon" size="icon">
                    <Plus className="stroke-de_orange !w-[18px] !h-[18px]" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={12}>
                <PopoverHeader title="Create New Ritual" closePopover={popoverControl.setIsOpen} />

            </PopoverContent>
        </Popover>
    )
}