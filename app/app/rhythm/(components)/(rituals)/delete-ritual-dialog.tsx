import { DeleteDialogWrapper } from "@/components/ui/custom/delete-dialog-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { useRituals } from "@/context/rituals-provider";
import { useToast } from "@/hooks/use-toast";
import { Ritual } from "@/lib/types/rhythm-types";

export default function DeleteRitualDialog({ ritual }: { ritual: Ritual }) {

    const { dispatch } = useRituals();
    const { toast } = useToast()

    async function handleDeleteRitual() {
        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ritual.id)
        })

        if (res.ok) {
            dispatch({ type: "DELETE", payload: ritual.id })
            toast({
                title: "Ritual Deleted",
                description: ritual.name
            })
        } else {
            const { error } = await res.json()
            console.log(error)
            toast({
                title: "Error Deleting Ritual",
                description: error.message
            })
        }
    }

    return (
        <>
        <DeleteDialogWrapper 
            title="Delete Ritual"
            description={`Are you sure you want to delete the ritual, '${ritual.name}'?`}
            handleDelete={handleDeleteRitual}
        />
        <Toaster />
        </>
    )
}