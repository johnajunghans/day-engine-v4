import { DeleteDialogWrapper } from "@/components/ui/custom/delete-dialog-wrapper";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { useToast } from "@/hooks/use-toast";
import { RitualInstance } from "@/lib/types/rhythm-types";

export default function DeleteInstanceDialog({ instance }: { instance: RitualInstance}) {

    const { dispatch } = useRitualInstances();
    const { toast } = useToast()

    async function handleDeleteInstance() {
        const res = await fetch('http://localhost:3000/api/ritual_instances', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instance.id)
        })

        if (res.ok) {
            dispatch({ type: "DELETE", payload: { days: instance.days, id: instance.id } })
            toast({
                title: "Instance Deleted",
                description: `Instance of '${instance.Rituals.name}' successfully deleted.`
            })
        } else {
            const { error } = await res.json()
            console.log(error)
            toast({
                title: "Error Deleting Instance",
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