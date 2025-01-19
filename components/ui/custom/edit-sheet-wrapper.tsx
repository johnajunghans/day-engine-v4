import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "../button"
import { Edit } from "lucide-react"
import { Dispatch, ReactNode, SetStateAction } from "react"

interface EditSheetWrapperProps {
    title: string,
    description: string
    showDescription?: boolean
    children: ReactNode
    align?: "top" | "right" | "bottom" | "left"
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    triggerAsChild?: boolean
    form?: ReactNode | undefined
}

export default function EditSheetWrapper({ title, description, children, align="right", showDescription=false, isOpen, setIsOpen, triggerAsChild=false, form=undefined }: EditSheetWrapperProps) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                { triggerAsChild ? children : <Button variant="icon" size="icon"><Edit /></Button> }
            </SheetTrigger>
            <SheetContent side={align} className="!max-w-none border-de_orange_light_muted font-[family-name:var(--font-philosopher)] opacity-95 flex flex-col w-auto gap-4">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription hidden={showDescription ? true : false}>{description}</SheetDescription>
                </SheetHeader>
                { triggerAsChild ? form : children }
            </SheetContent>
        </Sheet>
    )
}