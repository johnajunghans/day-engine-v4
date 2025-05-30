import { PopoverWrapper } from "@/components/ui/custom/popover-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { RitualInstance } from "@/lib/types/rhythm-types";
import { useState } from "react";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { formSchema, getRitualById, InstanceForm } from "./instance-form";
import { useRituals } from "@/context/rituals-provider";
import { toast } from "sonner";
import { domain } from "@/lib/variables";
import { Plus } from "lucide-react";

// interface AddInstancePopoverProps {
    
// }

export default function AddInstancePopover({  }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ritual: "",
            startTime: "",
            endTime: "",
            days: []
        }
    })

    const { dispatch } = useRitualInstances()
    const { state: rituals } = useRituals()

    async function handleAddInstance(formValues: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const ritual = getRitualById(formValues.ritual, rituals)
        if (!ritual) throw Error("Ritual not found when attempting to add new Ritual Instance!")

        const instance = {
            ritual_id: ritual.id,
            start_time: formValues.startTime,
            end_time: formValues.endTime,
            days: formValues.days
        }

        const res = await fetch(`${domain}/api/ritual_instances`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(instance)
        })

        if(res.ok) {
            const { data: newInstance }: {data: RitualInstance} = await res.json()
            const completeInstance = {...newInstance, Rituals: { name: ritual.name, color: ritual.color }}
            dispatch({ type: "INSERT", payload: completeInstance as RitualInstance })
            toast.success("New Ritual Instance Created");
            form.reset();
            setIsOpen(false)
        } else {
            const { error }: { error: { message: string, code: string }} = await res.json();
            console.log(error)
            toast.error("Error creating new Ritual Instance", {
                description: error.message
            })
        }

    }

    return (
        <PopoverWrapper 
            title="Create New Ritual Instance" 
            popoverControl={{ isOpen, setIsOpen }}
            icon={<Plus size={24} />}
            sideOffset={16}
            alignOffset={-80}
        >
            <InstanceForm 
                form={form}
                handleSubmit={handleAddInstance as SubmitHandler<FieldValues>}
                isLoading={isLoading}
                setIsOpen={setIsOpen}
                buttonName="Create"
            />
        </PopoverWrapper>
    )
}