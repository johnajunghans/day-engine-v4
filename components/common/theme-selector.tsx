import { FunctionComponent, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SwatchBook } from "lucide-react";
import { Color, useTheme } from "@/context/theme-provider";
import { Button } from "../ui/button";

interface ThemeSelectorProps {
    align: "center" | "end" | "start";
}

// const modes: Mode[] = ["light", "dark"]
const colors: Color[] = ["default", "blue", "green", "purple"]
 
const ThemeSelector: FunctionComponent<ThemeSelectorProps> = ({ align="end" }) => {

    const { theme, setTheme } = useTheme();
    // const [currentMode, currentColor]: [Mode, Color] = theme.split(" ") as [Mode, Color];
    const currentColor: Color = theme.split(" ")[1] as Color;

    // const [mode, setMode] = useState(currentMode);
    const [color, setColor] = useState(currentColor);

    useEffect(() => {
        setTheme(`dark ${color}`)
    }, [color, setTheme])

    return (  
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="icon" size="icon">
                    <SwatchBook size={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={16} align={align}>
                <DropdownMenuLabel>THEME</DropdownMenuLabel>
                {/* <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={mode} onValueChange={setMode as (mode: string) => void}>
                    {modes.map(mode => (
                        <DropdownMenuRadioItem value={mode} key={mode}>{mode}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup> */}
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={color} onValueChange={setColor as (mode: string) => void}>
                    {colors.map(color => (
                        <DropdownMenuRadioItem value={color} key={color}>{color}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default ThemeSelector;