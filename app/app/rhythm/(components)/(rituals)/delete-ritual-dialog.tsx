import { DeleteDialogWrapper } from "@/components/ui/custom/delete-dialog-wrapper";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { useRituals } from "@/context/rituals-provider";
import { Ritual } from "@/lib/types/rhythm-types";
import { toast } from "sonner";

export default function DeleteRitualDialog({ ritual }: { ritual: Ritual }) {

    const { dispatch: ritualsDispatch } = useRituals();
    const { dispatch: instanceDispatch } = useRitualInstances();

    async function handleDeleteRitual() {
        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ritual.id)
        })

        if (res.ok) {
            ritualsDispatch({ type: "DELETE", payload: ritual.id })
            instanceDispatch({ type: "RITUAL_DELETE", payload: ritual.id }) // delete all instances of this ritual
            toast.success("Ritual Deleted")
        } else {
            const { error } = await res.json()
            console.log(error)
            toast.error("Error Deleting Ritual", {
                description: error.message
            })
        }
    }

    return (
        <DeleteDialogWrapper 
            title="Delete Ritual"
            description={`Are you sure you want to delete the ritual, '${ritual.name}'?`}
            handleDelete={handleDeleteRitual}
        />
    )
}