import { Button } from "@/components/ui/button"
import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Color, ColorSelector } from "./color-selector"
import { AddPopoverWrapper } from "@/components/ui/custom/add-popover-wrapper"
import { useRituals } from "@/context/rituals-provider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Ritual } from "@/lib/types/rhythm-types"
import { PopoverClose } from "@radix-ui/react-popover"

// type AddRitualPopoverProps = {
   
// }

const formSchema = z.object({
    name: z.string(),
    description: z.string()
})

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

        const res = await fetch('http://localhost:3000/api/rituals', {
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
        <AddPopoverWrapper popoverControl={{ isOpen, setIsOpen }} title="Create New Ritual" isContentBlurred={isColorSelectorOpen}>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddRitual)} className="w-[400px] flex flex-col gap-4 mt-1">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputLabelWrapper htmlFor="name" label="RITUAL NAME">
                                        <Input id="name" autoFocus className="font-[family-name:var(--font-jb-mono)] h-14 text-xl" type="text" required {...field} />
                                        <div className="absolute top-3 right-3">
                                            <ColorSelector selectedColor={color} setSelectedColor={setColor} isOpen={isColorSelectorOpen} setIsOpen={setIsColorSelectorOpen} />
                                        </div>
                                    </InputLabelWrapper>
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputLabelWrapper htmlFor="description" label="DESCRIPTION">
                                        <Textarea id="description" className="font-[family-name:var(--font-jb-mono)]" {...field} />
                                    </InputLabelWrapper>
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className="flex gap-2">
                            <Button type="submit" variant="primary" className={isLoading ? "bg-opacity-50" : "bg-opacity-100"}>Create</Button>
                            <PopoverClose asChild>
                                <Button type="button" variant="text">Cancel</Button>
                            </PopoverClose>
                        </div>
                    </form>
                </Form>
        </AddPopoverWrapper>
        <Toaster />
        </>
    )
}