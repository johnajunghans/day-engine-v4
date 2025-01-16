import { Plus, X } from "lucide-react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Dispatch, ReactNode, SetStateAction } from "react";

type PopoverControl = { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }

interface AddPopoverWrapperProps {
    popoverControl: PopoverControl
    isContentBlurred?: boolean
    title: string
    children: ReactNode
}

interface PopoverHeaderProps {
    title: string,
    closePopover: Dispatch<SetStateAction<boolean>>
}

function AddPopoverWrapper({ popoverControl, isContentBlurred, title, children }: AddPopoverWrapperProps) {

    function Header({ title, closePopover }: PopoverHeaderProps) {
        return (
            <div className="flex justify-between mb-4">
                <h3 className="text-de_orange">{title}</h3>
                <Button onClick={() => closePopover(false)} aria-label="close" variant="icon" size="icon"><X className="!w-[18px] !h-[18px] stroke-de_orange_light" /></Button>
            </div>
        )
    }

    return (
        <Popover open={popoverControl.isOpen} onOpenChange={popoverControl.setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="icon" size="icon">
                    <Plus className="stroke-de_orange !w-[18px] !h-[18px]" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={12} alignOffset={-82} className={`${isContentBlurred ? "blur-[1px]" : "blur-0"} duration-75`}>
                <Header title={title} closePopover={popoverControl.setIsOpen} />
                { children }
            </PopoverContent>
        </Popover>
    )
}

export {
    AddPopoverWrapper,
    type PopoverControl 
}