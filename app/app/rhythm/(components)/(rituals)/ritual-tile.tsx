import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { getElapsedWeeks } from "@/lib/functions/rhythm-functions";
import { Ritual } from "@/lib/types/rhythm-types";
import { AccordionItem } from "@radix-ui/react-accordion";
import { memo } from "react";
import EditRitualSheet from "./edit-ritual-sheet";
import DeleteRitualDialog from "./delete-ritual-dialog";

function RitualTile({ ritual }: { ritual: Ritual }) {
    // Get number of weeks since ritual has been created
    const now = new Date();
    const createdAt = new Date(ritual.created_at);
    const weeksElapsed = getElapsedWeeks(now, createdAt);

    return (
        <AccordionItem id="ritual-tile-item" value={`Ritual-${ritual.id}`} className="border-b border-de_orange_light_muted">
            <AccordionTrigger>
                <div className="flex gap-2 items-center">
                    <p className="text-xl uppercase first-letter:text-3xl tracking-wide font-bold">{ritual.name}</p>
                    <Separator orientation="vertical" className="h-8" />
                    <p className="w-6 h-6 text-center leading-6 text-lg bg-de_orange_light text-background rounded-sm font-[family-name:var(--font-jb-mono)]">{weeksElapsed}</p>
                    <div className={`w-6 h-6 rounded-sm ${ritual.color}-gradient`}></div>
                 </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 px-4">
                {/* <Separator /> */}
                <p className="text-base overflow-ellipsis">{ritual.description}</p>
                <Separator className="bg-white_muted/25" />
                <div className="flex justify-end">
                    <EditRitualSheet ritual={ritual} />
                    <DeleteRitualDialog ritual={ritual} />
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

// Memoize the RitualTile component
export default memo(RitualTile, (prevProps, nextProps) => {
    return prevProps.ritual === nextProps.ritual;
});