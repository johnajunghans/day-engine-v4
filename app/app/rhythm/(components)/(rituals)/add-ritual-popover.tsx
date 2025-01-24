import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Color } from "./color-selector"
import { AddPopoverWrapper } from "@/components/ui/custom/add-popover-wrapper"
import { useRituals } from "@/context/rituals-provider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Ritual } from "@/lib/types/rhythm-types"
import { formSchema, RitualForm } from "./ritual-form"
import { domain, isDev } from "@/lib/variables"

// type AddRitualPopoverProps = {
   
// }

console.log(domain, isDev)

export default function AddRitualPopover ({  }) {

    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState<Color>("zinc")
    const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { dispatch: ritualDispatch } = useRituals()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    async function handleAddRitual(formValues: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const newRitual = {
            name: formValues.name,
            description: formValues.description,
            color
        }

        const res = await fetch(`${domain}/api/rituals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRitual)
        })

        if (res.ok) {
            const { data: ritual }: { data: Ritual } = await res.json()
            ritualDispatch({ type: "INSERT", payload: ritual })
            toast({
                title: "Ritual Created",
                description: `${ritual.name}`
            })
        } else {
            const { error }: { error: { message: string, code: string }} = await res.json();
            console.log(error)
            toast({
                title: "Error creating new Ritual Instance",
                description: error.message 
            })
        }
        setIsOpen(false)
    }

    return (
        <>
        <AddPopoverWrapper 
            popoverControl={{ isOpen, setIsOpen }} 
            title="Create New Ritual" 
            isContentBlurred={isColorSelectorOpen}
            sideOffset={12}
            alignOffset={-92}
        >
            <RitualForm 
                form={form}
                handleSubmit={handleAddRitual as SubmitHandler<FieldValues>}
                color={color}
                setColor={setColor}
                isLoading={isLoading}
                isColorSelectorOpen={isColorSelectorOpen}
                setIsColorSelectorOpen={setIsColorSelectorOpen}
                setIsOpen={setIsOpen}
                buttonName="Create"
                width={400}
            />
        </AddPopoverWrapper>
        <Toaster />
        </>
    )
}