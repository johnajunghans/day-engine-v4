import EditSheetWrapper from "@/components/ui/custom/edit-sheet-wrapper";
import { useRituals } from "@/context/rituals-provider";
import { Ritual } from "@/lib/types/rhythm-types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema, RitualForm } from "./ritual-form";
import { useState } from "react";
import { Color } from "./color-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import DeleteRitualDialog from "./delete-ritual-dialog";

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

    const { dispatch } = useRituals();
    const { toast } = useToast();

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
            dispatch({ type: "UPDATE", payload: updatedRitualRes })
            toast({
                title: "Ritual Updated",
                description: `${updatedRitualRes.name}`
            })
            setIsOpen(false)
        } else {
            const { error } = await res.json()
            console.log(error)
            toast({
                title: "Error Updating Ritual",
                description: `${error.message}`
            }) 
        }
    }

    return (
        <EditSheetWrapper title="Edit Ritual" align="left" description={`${ritual.name}`} isOpen={isOpen} setIsOpen={setIsOpen}>
            <RitualForm 
                form={form}
                handleSubmit={handleEditRitual}
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