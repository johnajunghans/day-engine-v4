import { DeleteDialogWrapper } from "@/components/ui/custom/delete-dialog-wrapper";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { RitualInstance } from "@/lib/types/rhythm-types";
import { domain } from "@/lib/variables";
import { toast } from "sonner";

export default function DeleteInstanceDialog({ instance }: { instance: RitualInstance}) {

    const { dispatch } = useRitualInstances();

    async function handleDeleteInstance() {
        const res = await fetch(`${domain}/api/ritual_instances`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instance.id)
        })

        if (res.ok) {
            dispatch({ type: "DELETE", payload: { days: instance.days, id: instance.id } })
            toast.success("Instance Deleted")
        } else {
            const { error } = await res.json()
            console.log(error)
            toast.error("Error Deleting Instance", {
                description: error.message
            })
        }
    }

    return (
        <DeleteDialogWrapper 
            title="Delete Ritual Instance"
            description={`Are you sure you want to delete this instance of ${instance.Rituals.name}?`}
            handleDelete={handleDeleteInstance}
        />
    )
}