import { Button } from "@/components/ui/button";
import logout from "./actions";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Logout() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="submit" variant="icon" size="icon">
                    <LogOut size={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={16} className="min-w-0 p-2">
                <form action={logout}>
                    <Button type="submit" variant="primary">Logout</Button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}