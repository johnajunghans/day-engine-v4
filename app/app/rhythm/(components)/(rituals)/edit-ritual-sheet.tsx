import EditSheetWrapper from "@/components/ui/custom/edit-sheet-wrapper";
import { useRituals } from "@/context/rituals-provider";
import { Ritual } from "@/lib/types/rhythm-types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema, RitualForm } from "./ritual-form";
import { useState } from "react";
import { Color } from "./color-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteRitualDialog from "./delete-ritual-dialog";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { toast } from "sonner";

interface EditRitualSheetProps {
    ritual: Ritual
}

export default function EditRitualSheet({ ritual }: EditRitualSheetProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ritual.name,
            description: ritual.description
        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState<Color>(ritual.color as Color)
    const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { dispatch: ritualsDispatch } = useRituals();
    const { dispatch: instanceDispatch } = useRitualInstances();

    async function handleEditRitual(formValues: z.infer<typeof formSchema>) {
        setIsLoading(true)

        if (
            formValues.name === ritual.name &&
            formValues.description === ritual.description &&
            color === ritual.color
        ) return setIsOpen(false)

        const updatedRitual = {
            id: ritual.id,
            ...(formValues.name !== ritual.name && { name: formValues.name }),
            ...(formValues.description !== ritual.description && { description: formValues.description }),
            ...(color !== ritual.color && { color })
        }

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRitual)
        })

        if (res.ok) {
            const { data: updatedRitualRes }: { data: Ritual } = await res.json()
            ritualsDispatch({ type: "UPDATE", payload: updatedRitualRes })
            if (formValues.name !== ritual.name || color !== ritual.color) { // If the ritual name or color has changed
                instanceDispatch({ type: "RITUAL_UPDATE", payload: updatedRitualRes }) // Update all instances with the new ritual name and color
            }
            toast.success("Ritual successfully updated")
            setIsOpen(false)
        } else {
            const { error } = await res.json()
            console.log(error)
            toast.error("Error updating ritual") 
        }
    }

    return (
        <EditSheetWrapper title="Edit Ritual" align="left" description={`${ritual.name}`} isOpen={isOpen} setIsOpen={setIsOpen}>
            <RitualForm 
                form={form}
                handleSubmit={handleEditRitual as SubmitHandler<FieldValues>}
                color={color}
                setColor={setColor}
                isLoading={isLoading}
                isColorSelectorOpen={isColorSelectorOpen}
                setIsColorSelectorOpen={setIsColorSelectorOpen}
                setIsOpen={setIsOpen}
                buttonName="Update"
                deleteRitualTrigger={<DeleteRitualDialog ritual={ritual} />}
            />
        </EditSheetWrapper>
    )
}