import { AddPopoverWrapper } from "@/components/ui/custom/add-popover-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RitualInstance } from "@/lib/types/rhythm-types";
import { useState } from "react";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { formSchema, getRitualById, InstanceForm } from "./instance-form";
import { useRituals } from "@/context/rituals-provider";

// interface AddInstancePopoverProps {
    
// }

export default function AddInstancePopover({  }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ritual: 0,
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

        const res = await fetch('http://localhost:3000/api/ritual_instances', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(instance)
        })

        if(res.ok) {
            const { data: newInstance }: {data: RitualInstance} = await res.json()
            const completeInstance = {...newInstance, Rituals: { name: ritual.name, color: ritual.color }}
            dispatch({ type: "INSERT", payload: completeInstance as RitualInstance })
            toast({
                title: `New Instance of ${ritual.name}`,
                description: `From ${newInstance.start_time} to ${newInstance.end_time}`
            })
            form.reset();
            setIsOpen(false)
        } else {
            const { error }: { error: { message: string, code: string }} = await res.json();
            console.log(error)
            toast({
                title: "Error creating new Ritual Instance",
                description: error.message 
            })
        }

    }

    return (
        <>
        <AddPopoverWrapper 
            title="Create New Ritual Instance" 
            popoverControl={{ isOpen, setIsOpen }}
            sideOffset={12}
            alignOffset={-81}
        >
            <InstanceForm 
                form={form}
                handleSubmit={handleAddInstance}
                isLoading={isLoading}
                setIsOpen={setIsOpen}
                buttonName="Create"
            />
        </AddPopoverWrapper>
        <Toaster />
        </>
    )
}