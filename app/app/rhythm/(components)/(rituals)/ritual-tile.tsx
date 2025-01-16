import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { getElapsedWeeks } from "@/lib/functions/rhythm-functions";
import { Ritual } from "@/lib/types/rhythm-types";
import { AccordionItem } from "@radix-ui/react-accordion";
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
        <AccordionItem id="ritual-tile-item" value={`Ritual-${ritual.id}`} className="border-b border-de_orange_light_muted">
            <AccordionTrigger>
                <div className="flex gap-2 items-center">
                    <p onClick={() => setEditName(true)} className="text-xl uppercase first-letter:text-3xl tracking-wide font-bold">{name}</p>
                    <Separator orientation="vertical" className="h-8" />
                    <p className="w-6 h-6 text-center leading-6 text-lg bg-de_orange_light text-background rounded-sm font-[family-name:var(--font-jb-mono)]">{weeksElapsed}</p>
                    <div className={`w-6 h-6 rounded-sm ${ritual.color}-gradient`}></div>
                 </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
                {/* <Separator /> */}
                <p className="text-base overflow-ellipsis">{ritual.description}</p>
                {/* <Separator /> */}
            </AccordionContent>
        </AccordionItem>
    )
}