import { X } from "lucide-react"
import { Button } from "../button"
import { Dispatch, SetStateAction } from "react"

type PopoverHeaderProbs = {
    title: string
    closePopover: Dispatch<SetStateAction<boolean>>
}

export default function PopoverHeader ({ title, closePopover }: PopoverHeaderProbs) {
    return (
        <div className="flex justify-between">
            <h3 className="text-de_orange">{title}</h3>
            <Button onClick={() => closePopover(false)} variant="icon" size="icon"><X className="!w-[18px] !h-[18px] stroke-de_orange_light" /></Button>
        </div>
    )
}