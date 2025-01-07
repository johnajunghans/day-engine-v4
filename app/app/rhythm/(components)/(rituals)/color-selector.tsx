import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";

interface ColorSelectorProps {
    setColor: Dispatch<SetStateAction<Color>>
    selectedColor: string
}

type Color = "rose" | "fuscia" | "violet" | "indigo" | "sky" | "emerald" | "amber" | "zinc" | "slate"

const colors: Color[] = ["rose", "fuscia", "violet", "indigo", "sky", "emerald", "amber", "zinc", "slate"]

function ColorSelector ({ setColor, selectedColor }: ColorSelectorProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={`w-8 h-8 ${selectedColor}-gradient`}></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" alignOffset={1000} sideOffset={-32}>
                <DropdownMenuLabel>COLOR</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedColor} onChange={setColor}>
                    {colors.map(color => (
                        <DropdownMenuRadioItem value={color} key={color}><div className={`w-6 h-6 rounded-sm ${color}-gradient`} /></DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { ColorSelector, colors, type Color}