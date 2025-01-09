import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";

interface ColorSelectorProps {
    setSelectedColor: Dispatch<SetStateAction<Color>>
    selectedColor: Color
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

type Color = "rose" | "fuscia" | "violet" | "indigo" | "sky" | "emerald" | "amber" | "zinc" | "slate"

const colors: Color[] = ["rose", "amber", "emerald", "sky", "indigo", "violet", "fuscia", "zinc", "slate"]

function ColorSelector ({ setSelectedColor, selectedColor, isOpen, setIsOpen }: ColorSelectorProps) {

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button className={`w-8 h-8 shadow-md ${selectedColor}-gradient border border-background hover:border-de_orange_light_muted`}></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={12}>
                <DropdownMenuLabel>COLOR</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                    {colors.map(color => (
                        <DropdownMenuRadioItem value={color} key={color}><div className={`w-6 h-6 shadow-sm rounded-sm ${color}-gradient`} /></DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { ColorSelector, colors, type Color}