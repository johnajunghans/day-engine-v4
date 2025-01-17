import EditSheetWrapper from "@/components/ui/custom/edit-sheet-wrapper";
import { useRituals } from "@/context/rituals-provider";
import { Ritual } from "@/lib/types/rhythm-types";

interface EditRitualSheetProps {
    ritual: Ritual
}

export default function EditRitualSheet({ ritual }: EditRitualSheetProps) {
    if (!ritual) throw Error("Ritual is not defined in Edit Ritual Sheet!");

    const { dispatch } = useRituals();

    return (
        <EditSheetWrapper title="Edit Ritual" align="left" description={`${ritual.name}`}>
            <div></div>
        </EditSheetWrapper>
    )
}