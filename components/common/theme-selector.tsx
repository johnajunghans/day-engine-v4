import { FunctionComponent, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SwatchBook } from "lucide-react";
import { Color, Mode, useTheme } from "@/context/theme-provider";

interface ThemeSelectorProps {
    align: "center" | "end" | "start";
}

const modes: Mode[] = ["light", "dark"]
const colors: Color[] = ["default", "blue", "green", "purple"]
 
const ThemeSelector: FunctionComponent<ThemeSelectorProps> = ({ align="end" }) => {

    const { theme, setTheme } = useTheme();
    const [currentMode, currentColor]: [Mode, Color] = theme.split(" ") as [Mode, Color];

    const [mode, setMode] = useState(currentMode);
    const [color, setColor] = useState(currentColor);

    useEffect(() => {
        setTheme(`${mode} ${color}`)
    }, [mode, color, setTheme])

    return (  
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SwatchBook role="button" className="stroke-de_orange_light w-8 h-8 p-1 hover:bg-white/5 rounded-sm cursor-pointer"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={16} align={align}>
                <DropdownMenuLabel>THEME</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={mode} onValueChange={setMode}>
                    {modes.map(mode => (
                        <DropdownMenuRadioItem value={mode} key={mode}>{mode}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
                    {colors.map(color => (
                        <DropdownMenuRadioItem value={color} key={color}>{color}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default ThemeSelector;