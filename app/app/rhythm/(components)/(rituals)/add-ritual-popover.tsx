import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Color } from "./color-selector"
import { PopoverWrapper } from "@/components/ui/custom/popover-wrapper"
import { useRituals } from "@/context/rituals-provider"
import { Ritual } from "@/lib/types/rhythm-types"
import { formSchema, RitualForm } from "./ritual-form"
import { domain, isDev } from "@/lib/variables"
import { toast } from "sonner"
import { Plus } from "lucide-react"

// type AddRitualPopoverProps = {
   
// }

console.log(domain, isDev)

export default function AddRitualPopover ({  }) {

    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState<Color>("zinc")
    const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { dispatch: ritualDispatch } = useRituals()

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
            toast.success("Ritual Created")
        } else {
            const { error }: { error: { message: string, code: string }} = await res.json();
            console.log(error)
            toast.error("Error creating Ritual")
        }
        setIsOpen(false)
    }

    return (
        <PopoverWrapper 
            popoverControl={{ isOpen, setIsOpen }}
            icon={<Plus size={24} />} 
            title="Create New Ritual" 
            isContentBlurred={isColorSelectorOpen}
            sideOffset={16}
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
        </PopoverWrapper>
    )
}