import { Button } from "@/components/ui/button";
import logout from "./actions";
import { LogOut } from "lucide-react";

export default function Logout() {
    return (
        <form action={logout}>
            <Button type="submit" variant="icon" size="icon"><LogOut className="stroke-de_orange_light !w-8 !h-8 p-1" /></Button>
        </form>
    )
}