import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getElapsedWeeks } from "@/lib/functions/rhythm-functions";
import { Ritual } from "@/lib/types/rhythm-types";
import { ChevronLeft, Edit } from "lucide-react";
import { useState } from "react";

export default function RitualTile({ ritual }: { ritual: Ritual }) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [name, setName] = useState(ritual.name);
    const [editName, setEditName] = useState(false);

    // Get number of weeks since ritual has been created
    const now = new Date();
    const createdAt = new Date(ritual.created_at);
    const weeksElapsed = getElapsedWeeks(now, createdAt);

    function handleEditName() {
        // Update db
        setEditName(false);
    }

    return (
        <div id={`ritual-${name}-tile`} className={`w-full px-3 py-2 bg-background border ${isExpanded ? "border-white_muted/40" : "border-white_muted/20"} transition-[border-color] rounded-lg flex flex-col gap-1`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {editName 
                        ? <Input autoFocus name="edit-name" value={name} onChange={e => setName(e.target.value)} onBlur={handleEditName} className="border-none h-9 p-0 text-2xl font-bold" /> 
                        : <p onClick={() => setEditName(true)} className="text-xl uppercase first-letter:text-3xl tracking-wide font-bold">{name}</p>
                    }
                    <Separator orientation="vertical" className="h-8" />
                    <p className="w-6 h-6 text-center leading-6 text-lg bg-de_orange_light text-background rounded-sm font-[family-name:var(--font-jb-mono)]">{weeksElapsed}</p>
                    <div className={`w-6 h-6 rounded-sm ${ritual.color}-gradient border border-de_orange_light_muted`}></div>
                </div>
                <div className="flex">
                    <Button variant="icon" size="icon"><Edit className="!w-5 !h-5 stroke-de_orange_light" /></Button>
                    <Button variant="icon" size="icon" onClick={() => setIsExpanded(!isExpanded)}><ChevronLeft className={`!w-5 !h-5 stroke-de_orange_light ${isExpanded ? "rotate-[-90deg]" : "rotate-0"} duration-200`} /></Button>
                </div>
            </div>
            {isExpanded && <div className="flex flex-col gap-2">
                <Separator />
                <p className="text-base overflow-ellipsis">{ritual.description}</p>
                <Separator />
            </div>}
        </div>
    )
}