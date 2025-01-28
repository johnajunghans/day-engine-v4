import { Plus, X } from "lucide-react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { PopoverClose, PopoverPortal } from "@radix-ui/react-popover";

type PopoverControl = { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }

interface AddPopoverWrapperProps {
    popoverControl: PopoverControl
    isContentBlurred?: boolean
    title: string
    children: ReactNode
    align?: "start" | "center" | "end" | undefined
    sideOffset?: number
    alignOffset?: number
}

interface PopoverHeaderProps {
    title: string,
}

function AddPopoverWrapper({ popoverControl, isContentBlurred, title, children, align="start", sideOffset=0, alignOffset=0 }: AddPopoverWrapperProps) {

    function Header({ title }: PopoverHeaderProps) {
        return (
            <div className="flex justify-between mb-4">
                <h3 className="text-de_orange">{title}</h3>
                <PopoverClose asChild>
                    <Button aria-label="close" variant="icon" size="icon"><X size={18} /></Button>
                </PopoverClose>
            </div>
        )
    }

    return (
        <Popover modal open={popoverControl.isOpen} onOpenChange={popoverControl.setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="icon" size="icon">
                    <Plus size={20} className="!stroke-de_orange" />
                </Button>
            </PopoverTrigger>
            <PopoverPortal>
                <div>
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-10"></div>
                    <PopoverContent align={align} sideOffset={sideOffset} alignOffset={alignOffset} className={`${isContentBlurred ? "blur-[1px]" : "blur-0"} duration-75`}>
                        <Header title={title} />
                        { children }
                    </PopoverContent>
                </div>
            </PopoverPortal>
        </Popover>
    )
}

export {
    AddPopoverWrapper,
    type PopoverControl 
}