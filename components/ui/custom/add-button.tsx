import { Plus } from "lucide-react";
import { Button } from "../button";

export default function AddButton ({ size=18, strokeWidth=2 }: { size?: number, strokeWidth?: number }) {
    return (
        <Button variant="icon" size="icon">
            <Plus strokeWidth={strokeWidth} className={`stroke-de_orange !w-[${size}px] !h-[${size}px]`} />
        </Button>
    )
}