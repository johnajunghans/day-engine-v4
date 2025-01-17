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
import { ReactNode } from "react"

interface EditSheetWrapperProps {
    title: string,
    description: string
    showDescription?: boolean
    children: ReactNode
    align?: "top" | "right" | "bottom" | "left"
}

export default function EditSheetWrapper({ title, description, children, align="right", showDescription=false }: EditSheetWrapperProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="icon" size="icon"><Edit /></Button>
            </SheetTrigger>
            <SheetContent side={align} className="backdrop-blur-sm">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription hidden={showDescription ? true : false}>{description}</SheetDescription>
                </SheetHeader>
                { children }
            </SheetContent>
        </Sheet>
    )
}